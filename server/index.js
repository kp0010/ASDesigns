import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

import { requireAuth, clerkClient } from "@clerk/express"

const app = express()

// Constants

dotenv.config({ path: "./.env.dev" })

const SERVER_PORT = process.env.SERVER_PORT
const CLIENT_URL = process.env.CLIENT_URL

const PG_DB_CONFIG = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DB,
	port: process.env.PG_PORT,
}

// Constants End

// -----------------------------------------------------------

// Middleware

app.use(cors({
	origin: CLIENT_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
}))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(requireAuth({
	secretKey: process.env.CLERK_SECRET_KEY,
}))

app.use(function(_, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Middleware End

// -----------------------------------------------------------

// Database Setup

const { Pool } = pg
const db = new Pool(PG_DB_CONFIG)

db.connect(function(err) {
	if (err) throw err;
	console.log("Database Connected!");
});

// Database Setup End

// -----------------------------------------------------------

// Routes

app.post("/api/auth/register", requireAuth(), async (req, res) => {
	// Add New User To DB
	try {
		const { userId } = req.auth
		const user = await clerkClient.users.getUser(userId)
		const { emailAddresses, firstName, lastName } = user

		const existingUser = await db.query("SELECT * FROM users WHERE clerk_id = $1", [userId]);

		if (existingUser.rowCount === 0) {
			await db.query(
				"INSERT INTO users (clerk_id, email, name) VALUES ($1, $2, $3)",
				[userId, emailAddresses[0].emailAddress, `${firstName} ${lastName}`]
			);
		}

		res.json({
			success: true,
			userAdded: existingUser.rowCount === 0,
			message: "User registered successfully"
		});

	} catch (error) {
		console.error("Error saving user:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Routes End

// -----------------------------------------------------------

app.listen(SERVER_PORT, () => {
	console.log(`App is listening on port ${SERVER_PORT}`)
	console.log(`Client URL is ${process.env.CLIENT_URL}`)
});
