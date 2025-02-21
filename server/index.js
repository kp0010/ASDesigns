import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
import multer from "multer"

import { google } from "googleapis"
import { requireAuth, clerkClient } from "@clerk/express"

import {
	getAllProducts,
	getIndividualProduct,
	deleteProduct,
	postProduct
} from "./routes/products.js"

import {
	getCartItems,
	deleteCartItem,
	postCartItem
} from "./routes/cart.js"

import {
	getWishlistItems,
	deleteWishlistItem,
	postWishlistItem
} from "./routes/wishlist.js"

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
	password: process.env.PG_PASSWORD
}

const GDRIVE_KEY_FILE = process.env.GOOGLE_DRIVE_KEY_FILE
export const GDRIVE_PARENT_FOLDER_ID = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID

// Constants End

// -----------------------------------------------------------

// Middleware

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
}))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(function(_, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const requireAdmin = () => {
	// Custom requireAdmin middleware to use
	return async (req, res, next) => {
		try {
			await requireAuth()(req, res, async () => {
				const { userId } = req.auth

				const selectQuery = "SELECT * FROM users WHERE clerk_id = $1"

				db.query(selectQuery, [userId])
					.then((result) => {
						if (result.rowCount && result.rows[0]['admin']) {
							next()
						} else {
							res.status(403).json({ message: "Admin Authorization Required" });
						}
					})
			});
		} catch (error) {
			res.status(401).json({ message: "Unauthorized access", error: error.message });
		}
	}
};

// Middleware End

// -----------------------------------------------------------

// GDrive Setup

const auth = new google.auth.GoogleAuth({
	keyFile: GDRIVE_KEY_FILE,
	scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });

const upload = multer({ dest: process.env.MULTER_DESTINATION })

// GDrive End

// -----------------------------------------------------------

// Database Setup

const { Pool } = pg

export const db = new Pool(PG_DB_CONFIG)

db.connect(function(err) {
	if (err) throw err;
	console.log("Database Connected!");
});

// Database Setup End

// -----------------------------------------------------------

//	Routes

//	Auth Routes:
//	POST	:	/api/auth/register
//			Register New Users to the DB (Protected)

//	Product Routes:
//	GET	:	/api/products/page?/:pageNo?/?orderBy=x &limit=x &minPrice=x &maxPrice
//			View Products (Optionally Via Page Number and Sorting Options) (Public)

//	GET	:	/api/products/:productId
//			View Product with Specified Product Id (Public)

//	POST	:	/api/products/
//			Add New Product to the DB and the Assets to GDRIVE (Protected Admin)

//	DELETE	:	/api/products/:productId
//			Delete Product with Specified Product Id (Protected Admin)

//	TODO: 
//	PATCH	:	/api/products/:productId
//			Update Product with Specified Product Id (Protected Admin)

//	Cart Routes
//	GET	:	/api/carts/
//			Get All Cart Items for a User (Protected)

//	TODO: 
//	DELETE	:	/api/carts/
//			Delete Items from a Users Cart (Protected)

//	TODO: 
//	POST	:	/api/carts/
//			Add Items to a Users Cart (Protected)



app.post("/api/auth/register", requireAuth(), async (req, res) => {
	// Add New User To DB
	try {
		const { userId } = req.auth

		if (!userId) {
			return res.status(400).json({ error: "Missing User" });
		}

		const user = await clerkClient.users.getUser(userId)
		const { emailAddresses, firstName, lastName } = user

		const selectQuery = "SELECT * FROM users WHERE clerk_id = $1"
		const existingUser = await db.query(selectQuery, [userId]);

		const insertQuery = "INSERT INTO users (clerk_id, email, name) VALUES ($1, $2, $3)"

		if (existingUser.rowCount === 0) {
			await db.query(
				insertQuery, [userId, emailAddresses[0].emailAddress, `${firstName} ${lastName}`]
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


// PRODUCT
// Get All Products with Pagination and Sorting
app.get("/api/products/(page)?/:pageNo?", getAllProducts)

// Get individual Products by IDS
app.get("/api/products/:productId", getIndividualProduct)

// Add Files Uploaded from Client to Products Folder in GDrive
app.post("/api/products", requireAdmin(), upload.array("files"), postProduct)

// Delete Products from DB
app.delete("/api/products", requireAdmin(), deleteProduct)


// CART
// Get Cart Items for a User
app.get("/api/carts", requireAuth(), getCartItems)

// Post Items to Cart
app.get("/api/carts", requireAuth(), postCartItem)

// Delete Items from Cart
app.get("/api/carts", requireAuth(), deleteCartItem)


// WISHLIST
// Get Wishlist Items for a User
app.get("/api/wishlist", requireAuth(), getWishlistItems)

// Post Items to Wishlist
app.get("/api/wishlist", requireAuth(), postWishlistItem)

// Delete Items from Wishlist
app.get("/api/wishlist", requireAuth(), deleteWishlistItem)


// Routes End

// -----------------------------------------------------------

app.listen(SERVER_PORT, "0.0.0.0", () => {
	console.log(`App is listening on port ${SERVER_PORT}`)
	console.log(`Client URL is ${CLIENT_URL}`)
});
