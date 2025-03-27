import { db, razorpay } from "../index.js"
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js"

export const getUserIdFromClerkId = async (clerkId) => {
	const userSelectQuery = "SELECT * FROM users WHERE clerk_id = $1"
	const userResult = await db.query(userSelectQuery, [clerkId])

	return { userId: userResult.rows[0]["id"], admin: userResult.rows[0]["admin"] }
}


export const getUsersOrder = async (req, res) => {
	try {
		const { orderId } = req.body;

		if (!orderId) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const { userId: clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const { userId } = await getUserIdFromClerkId(clerkId)

		const orderSelectQuery = "SELECT * FROM orders " +
			"WHERE order_id = $1 " +
			"AND user_id = $2"


		const orderSelectResp = await db.query(orderSelectQuery,
			[orderId, userId])

		if (orderSelectResp.rowCount) {
			const orderItemsQuery = "SELECT p.id, p.product_id, p.name, p.category_id, op.amount " +
				"FROM order_products op " +
				"LEFT JOIN products p " +
				"ON op.product_id = p.id " +
				"WHERE op.order_id = $1 "

			const orderItemsResp = await db.query(orderItemsQuery, [orderId])

			res.status(200).json({
				success: true,
				message: "Order Retrieved Successfully",
				order: orderSelectResp.rows[0],
				orderItems: orderItemsResp.rows
			})
		} else {
			res.status(200).json({
				success: false,
				message: "Order Retrieval Unsuccesfull",
			})
		}
	} catch (error) {
		console.log("Order Retrieval Unsuccesfull", error)
		res
			.status(500)
			.json({ success: false, message: "Order Retrieval Unsuccesfull" });
	}
}

export const getUsersOrders = async (req, res) => {
	try {
		const { getAll } = req.body

		const { userId: clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const { userId, admin } = await getUserIdFromClerkId(clerkId)

		const orderSelectQuery = "SELECT * FROM orders " +
			(!(getAll && admin) ? "WHERE user_id = $1" : "")

		const queryParams = []
		if (!(getAll && admin)) {
			queryParams.push(userId)
		}

		const orderSelectResp = await db.query(orderSelectQuery, queryParams)

		if (orderSelectResp.rowCount) {
			res.status(200).json({
				success: true,
				message: "Orders Retrieved Successfully",
				orders: orderSelectResp.rows
			})
		} else {
			res.status(404).json({
				success: false,
				message: "Orders Retrieval Unsuccesfull",
			})
		}
	} catch (error) {
		console.log("Orders Retrieval Unsuccesfull", error)
		res
			.status(500)
			.json({ success: false, message: "Orders Retrieval Unsuccesfull" });
	}
}

async function addOrderItemsDB(orderId, buyNowProductId, userId) {
	const productInsertQuery = `
	    INSERT INTO order_products (order_id, product_id, amount)
	    SELECT 
		'${orderId}', 
		id, 
		price
	    FROM products p
	    WHERE p.product_id = ANY($1)`;

	let cartItemsIds = []

	if (buyNowProductId) {
		cartItemsIds.push(buyNowProductId)
	} else {
		const cartSelectQuery = `SELECT * FROM pop_cart_items($1);`
		const cartItemsRes = await db.query(cartSelectQuery, [userId])

		if (cartItemsRes.rowCount) {
			cartItemsIds = cartItemsRes.rows.map(item => item.product_id)
		}
	}

	await db.query(productInsertQuery, [cartItemsIds])
}

export const verifyUserPayment = async (req, res) => {
	const {
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature,
		buyNowProductId,
	} = req.body;

	if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	const secret = razorpay.key_secret;
	const body = razorpay_order_id + "|" + razorpay_payment_id;

	try {
		const isValidSignature = validateWebhookSignature(
			body,
			razorpay_signature,
			secret
		);

		if (isValidSignature) {
			const orderSelectQuery = `
			UPDATE orders	
				SET status = 'paid'
				WHERE order_id = $1
				RETURNING * `

			const orderSelectResp = await db.query(orderSelectQuery, [razorpay_order_id])

			const { userId: clerkId } = req.auth

			if (!clerkId) {
				return res.status(400).json({ error: "User Login Required" })
			}

			const { userId } = await getUserIdFromClerkId(clerkId)

			addOrderItemsDB(razorpay_order_id, buyNowProductId, userId)

			if (orderSelectResp.rows.length) {
				return res.status(200).json({ success: true, message: "Order Verified" });
			}

			return res.status(404).json({ message: "Order Not Found" });
		}

		res.status(400).json({ success: false, message: "Verification Failed" });
	} catch (error) {
		console.log("Error Verifying Payment", error)
		res
			.status(500)
			.json({ success: false, message: "Error Verifying Payment" });
	}
}

export const deleteUserOrder = async (req, res) => {
	try {
		const { orderId } = req.body;

		if (!orderId) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const { userId: clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const { userId } = await getUserIdFromClerkId(clerkId)

		const orderDeleteQuery = `
			DELETE FROM orders
				WHERE order_id = $1 AND user_id = $2
				RETURNING * `

		const orderDeleteResp = await db.query(orderDeleteQuery, [orderId, userId])

		res.json({
			success: true,
			message: "Order Deleted Successfully",
			order: orderDeleteResp.rows[0]
		});

	} catch (error) {
		console.error("Error Deleting order:", error);
		res.status(500)
			.json({ error: "Error Deleting order", details: error.message });
	}
}



export const postUsersOrders = async (req, res) => {
	try {
		const {
			amount,
			user_mail,
			user_phone,
			currency,
			receipt,
			notes
		} = req.body;

		if (!amount || !currency || !receipt) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const { userId: clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const { userId } = await getUserIdFromClerkId(clerkId)

		const options = {
			amount: parseInt(amount),
			currency,
			receipt,
			notes,
		};

		const order = await razorpay.orders.create(options);

		const orderInsertQuery = `
			INSERT INTO orders
			(order_id, user_id, user_mail, user_phone, total_amount, currency, receipt, status)
				VALUES($1, $2, $3, $4, $5, $6, $7, 'created')
				RETURNING * `

		const orderInsertResp = await db.query(orderInsertQuery,
			[order.id, userId, user_mail, user_phone, order.amount / 100, order.currency, order.receipt])

		res.json({
			success: true,
			message: "Order Created Successfully",
			order: orderInsertResp.rows[0]
		});

	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500)
			.json({ error: "Error creating order", details: error.message });
	}
}
