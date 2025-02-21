import { db } from "../index.js"

const getUserIdFromClerkId = async (clerkId) => {
	const userSelectQuery = "SELECT * FROM users WHERE clerk_id = $1"
	const userResult = await db.query(userSelectQuery, [clerkId])

	const userId = userResult.rows[0]["id"]

	return userId
}

export const getWishlistItems = async (req, res) => {
	try {
		const { clerkId } = req.auth

		if (!clerkId) {
			return res.status(400).json({ error: "User Login Required" })
		}

		const userId = getUserIdFromClerkId(clerkId)

		const wishlistSelectQuery = "SELECT * FROM get_wishlist_items($1)"
		const itemsResult = await db.query(wishlistSelectQuery, [userId])

		res.status(200).json({
			success: true,
			message: "Wishlist Retrieved Succesfully",
			wishlist: itemsResult.rows
		})


	} catch (error) {
		console.error("Error Reading Wishlist", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

export const postWishlistItem = async (req, res) => {
	try {
		const { clerkId } = req.auth
		const { productId } = req.body

		if (!clerkId || !productId) {
			return res.status(400).json({ error: "User Login or ProductId missing" })
		}

		const userId = getUserIdFromClerkId(clerkId)

		const wishlistInsertQuery = "INSERT INTO wishlists values ($1, $2) RETURNING *"
		const insertResult = await db.query(wishlistInsertQuery, [userId, productId])

		res.status(200).json({
			success: true,
			message: "Product Added to Wishlist Successfully",
			wishlistItem: insertResult.rows
		})


	} catch (error) {
		console.error("Error Adding Product to Wishlist", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

export const deleteWishlistItem = async (req, res) => {
	try {
		const { clerkId } = req.auth
		const { productId } = req.body

		if (!clerkId || !productId) {
			return res.status(400).json({ error: "User Login or ProductId missing" })
		}

		const userId = getUserIdFromClerkId(clerkId)

		const wishlistDeleteQuery = "DELETE FORM wishlists WHERE user_id = $1 AND product_id = $2"
		await db.query(wishlistDeleteQuery, [userId, productId])

		res.status(200).json({
			success: true,
			message: "Product Deleted from Wishlist Successfully",
		})


	} catch (error) {
		console.error("Error Deleting Product from Wishlist", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}
