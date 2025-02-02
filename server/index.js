import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

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
	credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))


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

app.get("/", (_, res) => {
	res.status(200).send("<span>HELLO WORLD</span>")
})

// Routes End

// -----------------------------------------------------------

app.listen(SERVER_PORT, () => {
	console.log(`App is listening on port ${SERVER_PORT}`)
	console.log(`Client URL is ${process.env.CLIENT_URL}`)
});
