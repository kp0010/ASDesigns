import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
import multer from "multer"
import fs from "fs"

import { google } from "googleapis"
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
	password: process.env.PG_PASSWORD
}

const GDRIVE_KEY_FILE = process.env.GOOGLE_DRIVE_KEY_FILE
const GDRIVE_PARENT_FOLDER_ID = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID

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

// app.use(requireAuth({ secretKey: process.env.CLERK_SECRET_KEY, }))

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

const drive = google.drive({ version: "v3", auth });

const upload = multer({ dest: process.env.MULTER_DESTINATION })

// GDrive End

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

// Auth Routes:
//	POST	:	/api/auth/register
//			Register New Users to the DB (Protected)

// Product Routes:
//	GET	:	/api/products/page?/:pageNo?/?order-by=x
//			View Products (Optionally Via Page Number and Sorting Options) (Public)

//	GET	:	/api/products/:productId
//			View Product with Specified Product Id (Public)

//	POST	:	/api/products/
//			Add New Product to the DB and the Assets to GDRIVE (Protected Admin)

//	DELETE	:	/api/products/:productId
//			Delete Product with Specified Product Id (Protected Admin) 

//	TODO: Implement Following Routes

//	PATCH	:	/api/products/:productId
//			Update Product with Specified Product Id (Protected Admin) 


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

app.get("/api/products/(page)?/:pageNo?", async (req, res) => {
	// Get All Products with Pagination and Sorting
	try {
		const pageNo = req.params["pageNo"] ? req.params["pageNo"] : 0
		const sortBy = req.query["order-by"] ? req.query["order-by"] : "default"

		// TODO: DB Query

		res.json({ pageNo, sortBy })

	} catch (error) {
		console.error("Error Reading Products", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

app.get("/api/products/:productId", async (req, res) => {
	// Get individual Products by IDS

	try {
		const { productId } = req.params

		const selectQuery = "SELECT * FROM products WHERE product_id = $1"

		const product = await db.query(selectQuery, [productId])

		res.status(200).json({
			success: Boolean(product.rowCount),
			message: product.rowCount ? "Product Retrieved Succesfully" : "Product Not Found",
			product: product.rows[0]
		})

	} catch (error) {
		console.error("Error Reading Product", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
})

const createNewFolderGDrive = async (newProductId) => {
	// Create the Folder for the files
	const folderMetadata = {
		name: newProductId,
		mimeType: "application/vnd.google-apps.folder",
		parents: [GDRIVE_PARENT_FOLDER_ID],
	};

	const newFolder = await drive.files.create({
		resource: folderMetadata,
		fields: "id, webViewLink",
	});

	return newFolder
}

const copyFilesGDrive = async (files, parentFolderId) => {
	// Upload the Files Uploaded via Multer
	const uploadedFiles = []

	for (let i = 0; i < files.length; i++) {
		let file = files[i]

		const fileMetadata = {
			name: file["originalname"],
			parents: [parentFolderId],
		};

		const media = {
			mimeType: file["mimetype"],
			body: fs.createReadStream(file["path"]),
		};

		const uploadedFile = await drive.files.create({
			resource: fileMetadata,
			media,
			fields: "id, name, webViewLink",
		});

		uploadedFiles.push(uploadedFile.data);

		fs.unlinkSync(file["path"], (err) => { console.error("Unable to Delete Uploads", err) });
	}
	return uploadedFiles
}

app.post("/api/products", requireAdmin(), upload.array("files"), async (req, res) => {
	// Add Files Uploaded from Client to Products Folder in GDrive
	try {
		// TODO: Add Products to the DB as well
		const newProductId = req.body["folderName"];
		const files = req.files

		if (!newProductId || !files) {
			return res.status(400).json({ error: "Missing newProductId or files" });
		}

		const newFolder = await createNewFolderGDrive(newProductId)
		const uploadedFiles = await copyFilesGDrive(files, newFolder.data.id)

		res.json({
			message: "Folder created & files copied",
			newFolder: newFolder,
			uploadedFiles: uploadedFiles
		});

	} catch (error) {
		console.error("Error copying files: ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const deleteProductGDrive = async (productId) => {
	const query = `name = '${productId}' and '${GDRIVE_PARENT_FOLDER_ID}' in parents`

	const folder = await drive.files.list({
		q: query,
		fields: "files(id, name)",
	})

	if (!folder) {
		return res.status(400).json({ error: "No Folder with the Specified Name found" })
	}

	const folderId = folder.data.files[0].id

	const deletedFolder = await drive.files.delete({
		fileId: folderId,
	})

	return deletedFolder
}

const deleteProductDB = async (productId) => {
	// TODO: Test API
	const query = `DELETE FROM products WHERE product_id = $1`

	const result = await db.query(query, [productId])
}

app.delete("/api/products", requireAdmin(), async (req, res) => {
	// Delete Products from DB
	// WARNING: Deleting from the DB or Google Drive will result in Previous Buyers of the Product from downloading it again
	// FIX: Maybe Check whether the Item has been bought ever and then remove only if not in orders list
	try {
		const { productId } = req.body

		if (!productId) {
			return res.status(400).json({ error: "Missing productId" })
		}

		const deletedFolder = await deleteProductGDrive(productId)

		await deleteProductDB(productId)

		res.json({
			success: !Boolean(deletedFolder["error"]),
			deletedFolder: deletedFolder,
			message: !Boolean(deletedFolder["error"]) ? "Product Deleted Successfully" : "Product Deletion Unsuccessful"
		})

	} catch (error) {
		console.error("Error Deleting Product: ", error)
		res.status(500).json({ error: "Internal Server Error" });
	}
})

// Routes End

// -----------------------------------------------------------

app.listen(SERVER_PORT, () => {
	console.log(`App is listening on port ${SERVER_PORT}`)
	console.log(`Client URL is ${process.env.CLIENT_URL}`)
});
