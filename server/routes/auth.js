import { db } from "../index.js"
import { clerkClient } from "@clerk/express";

export const postNewUser = async (req, res) => {
	// Add New User To DB
	try {
		const { userId } = req.auth;

		if (!userId) {
			return res.status(400).json({ error: "Missing User" });
		}

		const user = await clerkClient.users.getUser(userId);
		const { emailAddresses, firstName, lastName } = user;

		const selectQuery = "SELECT * FROM users WHERE clerk_id = $1";
		const existingUser = await db.query(selectQuery, [userId]);

		const insertQuery = "INSERT INTO users (clerk_id, email, name) VALUES ($1, $2, $3) RETURNING *";

		if (existingUser.rowCount === 0) {
			await db.query(insertQuery, [
				userId,
				emailAddresses[0].emailAddress,
				`${firstName} ${lastName}`,
			]);
		}

		res.json({
			success: true,
			userAdded: existingUser.rowCount === 0,
			message: "User registered successfully",
			user: existingUser.rowCount ? existingUser.rows[0] : insertQuery.rows[0]
		});

	} catch (error) {
		console.error("Error saving user:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getUser = async (req, res) => {
	try {
		const { userId } = req.auth;

		if (!userId) {
			return res.status(400).json({ error: "Missing User" });
		}

		const selectUserQuery = "SELECT * FROM users WHERE clerk_id = $1";
		const existingUser = await db.query(selectUserQuery, [userId]);

		res.json({
			success: existingUser.rowCount > 0,
			message: existingUser.rowCount > 0 ? "User Retrieved successfully" : "No User Found",
			user: existingUser.rows[0]
		});

	} catch (error) {
		console.error("Error saving user:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getAllUsers = async (_, res) => {
	try {
		const selectUsersQuery = "SELECT * FROM users";
		const selectUsersRes = await db.query(selectUsersQuery);

		res.json({
			success: selectUsersRes.rowCount > 0,
			message: selectUsersRes.rowCount > 0 ? "Users Retrieved successfully" : "No Users Found",
			users: selectUsersRes.rows
		});

	} catch (error) {
		console.error("Error Retrieving Users", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getDashboardStats = async (_, res) => {
	try {
		const statsQuery = "SELECT \
					(SELECT COUNT(*) FROM orders) as orderscount, \
					(SELECT COUNT(*) FROM products) as productscount, \
					(SELECT COUNT(*) FROM users) as userscount, \
					(SELECT SUM(total_amount) FROM orders WHERE status = 'paid') as totalrevenue; \
				";

		const statsRes = await db.query(statsQuery);

		res.json({
			success: statsRes.rowCount > 0,
			stats: {
				ordersCount: statsRes.rows[0].orderscount,
				productsCount: statsRes.rows[0].productscount,
				usersCount: statsRes.rows[0].userscount,
				totalRevenue: statsRes.rows[0].totalrevenue,
			}
		});

	} catch (error) {
		console.error("Error Retrieving Users", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
