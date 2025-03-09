import { db, razorpay } from "../index.js"
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js"


export const getUserOrders = (req, res) => {
	db.query
}

export const verifyUserPayment = async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

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


export const postUsersOrders = async (req, res) => {
	try {
		const { amount, currency, receipt, notes } = req.body;

		if (!amount || !currency || !receipt) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const options = {
			amount: amount,
			currency,
			receipt,
			notes,
		};

		const order = await razorpay.orders.create(options);

		const orderInsertQuery = `
			INSERT INTO orders
				(order_id, amount, currency, receipt, status)
				VALUES ($1, $2, $3, $4, 'created')
				RETURNING *`

		const orderInsertResp = await db.query(orderInsertQuery, [order.id, order.amount, order.currency, order.receipt])

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
