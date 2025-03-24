import { db } from "../index.js"

export const getUserIdFromClerkId = async (clerkId) => {
	const userSelectQuery = "SELECT * FROM users WHERE clerk_id = $1"
	const userResult = await db.query(userSelectQuery, [clerkId])

	return userResult.rows[0]["id"]
}

export const getCartItems = async (req, res) => {
	try {
		const { userId: clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const userId = await getUserIdFromClerkId(clerkId)

		const cartSelectQuery = "SELECT * FROM get_cart_items($1)"
		const itemsResult = await db.query(cartSelectQuery, [userId])

		res.status(200).json({
			success: true,
			message: "Cart Retrieved Succesfully",
			cart: itemsResult.rows
		})


	} catch (error) {
		console.error("Error Reading Cart", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

export const postCartItem = async (req, res) => {
	try {
		const { userId: clerkId } = req.auth
		const { productId } = req.body

		if (!clerkId || !productId) {
			return res.status(400).json({ error: "User Login or ProductId missing" })
		}

		const userId = await getUserIdFromClerkId(clerkId)

		const cartInsertQuery = "INSERT INTO carts values ($1, $2)"
		await db.query(cartInsertQuery, [userId, productId])

		const productSelectQuery = "SELECT * FROM products WHERE product_id = $1"
		const productResult = await db.query(productSelectQuery, [productId])

		res.status(200).json({
			success: true,
			message: "Product Added to Cart Successfully",
			cartItem: cartInsertQuery.rows,
			product: productResult.rows[0]
		})


	} catch (error) {
		console.error("Error Adding Product to Cart", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

export const deleteCartItem = async (req, res) => {
	try {
		const { userId: clerkId } = req.auth
		const { productId } = req.body

		if (!clerkId || !productId) {
			return res.status(400).json({ error: "User Login or ProductId missing" })
		}

		const userId = await getUserIdFromClerkId(clerkId)

		const cartDeleteQuery = "DELETE FROM carts WHERE user_id = $1 AND product_id = $2"
		await db.query(cartDeleteQuery, [userId, productId])

		res.status(200).json({
			success: true,
			message: "Product Deleted from Cart Successfully",
		})


	} catch (error) {
		console.error("Error Deleting Product from Cart", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}
