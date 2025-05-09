import dotenv from "dotenv"
import fs from "fs"
import {
	db, drive,
	GDRIVE_PARENT_FOLDER_ID
} from "../index.js"

dotenv.config({ path: "../.env.dev" })


function isValidNumeric(value) {
	if (typeof value !== 'string') return false;

	const match = value.match(/^[-+]?\d+(\.\d{1,4})?$/);
	if (!match) return false;

	const digitsOnly = value.replace('.', '').replace('-', '').replace('+', '');

	return digitsOnly.length <= 10;
}


const createGetProductsQuery = (req) => {
	const params = []

	const searchQuery = req.query["q"] ? req.query["q"] : ""
	const pageNo = req.params["pageNo"] ? req.params["pageNo"] : 0
	const orderBy = req.query["orderBy"] ? req.query["orderBy"] : "default"
	const limit = req.query["limit"] ? req.query["limit"] : 0

	const maxPrice = req.query["maxPrice"] ? req.query["maxPrice"] : null
	const minPrice = req.query["minPrice"] ? req.query["minPrice"] : null

	const categories = req.query["categories"] ? req.query["categories"].split(",") : []
	const tags = req.query["tags"] ? req.query["tags"].split(",") : []

	let selectQuery = "SELECT * FROM search_products($1, $2, $3)"

	params.push(searchQuery, categories, tags)

	// Add Price Min Max Clauses and Categories
	const priceClauses = []

	if (maxPrice !== null) { priceClauses.push(`price <= ${maxPrice}`) }
	if (minPrice !== null) { priceClauses.push(`price >= ${minPrice}`) }

	if (priceClauses.length) {
		selectQuery += " WHERE " + priceClauses.join(" AND ")
	}

	// Get total Products before Offsets and Limits
	const totalProductsQuery = `SELECT COUNT(*) FROM search_products($1, $2, $3)` +
		(priceClauses.length !== 0 ? " WHERE " : "") +
		priceClauses.join(" AND ")

	// Add Order By method
	// TODO: Add Popular Sort
	const sortToSql = {
		"default": "product_id",
		"popular": "popularity DESC",
		"recent": "updated_at DESC",
		"price_desc": "price DESC",
		"price_asc": "price",
		"random": "random()"
	}
	selectQuery += " ORDER BY " + sortToSql[orderBy]

	// Add Page Offset and Limit
	selectQuery += pageNo ? ` OFFSET ${pageNo * limit} ` : ""
	selectQuery += limit || pageNo ? ` LIMIT ${limit || 16} ` : ""

	return { totalProductsQuery, selectQuery, params }
}


const getProdAndCatSearch = async (req, res) => {
	// Get Products LIMIT 8 and Categories LIMIT 2 with SEARCH
	try {
		const searchQuery = req.query["q"]

		if (!searchQuery) {
			res.status(400).json({ error: "No Search Query Provided" })
		}

		const selectSearchedProductsQ = "SELECT * FROM search_products_and_categories($1)"
		const searchResults = await db.query(selectSearchedProductsQ, [searchQuery])

		res.status(200).json({
			success: true,
			message: "Products Searched Successfully",
			products: searchResults.rows
		})

	} catch (error) {
		console.error("Error Searching Products", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}


export const getProducts = async (req, res) => {
	// Get All Products with Pagination and Sorting
	try {
		const minimalQuery = req.query["minimal"]

		if (minimalQuery) {
			getProdAndCatSearch(req, res)
			return
		}

		const { totalProductsQuery, selectQuery, params } = createGetProductsQuery(req)

		const result = await db.query(selectQuery, params)
		const totalProductsResult = await db.query(totalProductsQuery, params)
		const priceExtremesResult = await db.query("SELECT MIN(price), MAX(price) FROM products")

		res.status(200).json({
			success: true,
			products: result.rows,
			minPrice: priceExtremesResult.rows[0]["min"],
			maxPrice: priceExtremesResult.rows[0]["max"],
			totalProducts: totalProductsResult.rows[0]["count"]
		})

	} catch (error) {
		console.error("Error Reading Products", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}


export const getProductsWithMetadata = async (req, res) => {
	// Get All Products with Pagination and Sorting
	try {
		let { q, limit, page } = req.query
		let offset = 0
		if (!q) { q = "" }
		if (!limit) { limit = 12 }

		if (!page) { offset = 0 }
		else { offset = limit * (page - 1) }

		const productsSelectQuery = "SELECT * FROM get_all_products_with_metadata($1, $2, $3)"
		const totalSelectQuery = "SELECT COUNT(*) as count FROM get_all_products_with_metadata($1)"

		const productsSelectResult = await db.query(productsSelectQuery, [q, limit, offset])
		const totalProductsResult = await db.query(totalSelectQuery, [q])

		res.status(200).json({
			success: true,
			products: productsSelectResult.rows,
			totalProducts: totalProductsResult.rows[0]["count"]
		})

	} catch (error) {
		console.error("Error Reading Products with Metadata", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}


export const getIndividualProduct = async (req, res) => {
	// Get individual Products by IDS
	try {
		const { productId } = req.params

		const updateSelectProdQuery = "UPDATE products \
			SET popularity = popularity + 1 \
			WHERE product_id = $1 \
			RETURNING * \
			"
		const categoryQuery = "SELECT * FROM get_product_categories($1)"

		const product = await db.query(updateSelectProdQuery, [productId])
		const categories = await db.query(categoryQuery, [productId])

		const tagQuery = `SELECT t.* FROM product_tags pt LEFT JOIN tags t on pt.tag_id = t.id WHERE pt.product_id = '${product.rows[0].id}'`
		const tags = await db.query(tagQuery)

		res.status(200).json({
			success: Boolean(product.rowCount),
			message: product.rowCount ? "Product Retrieved Succesfully" : "Product Not Found",
			product: product.rows[0],
			categories: categories.rows,
			tags: tags.rows
		})

	} catch (error) {
		console.error("Error Reading Product", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}


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

		console.log("Uploaded File :", file["originalname"])
	}
	return uploadedFiles
}


export const postProduct = async (req, res) => {
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
}


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


export const deleteProduct = async (req, res) => {
	// Delete Products from DB
	// WARNING: Deleting from the DB or Google Drive will result in Previous Buyers of the Product from downloading it again
	// FIX: Maybe Check whether the Item has been bought ever and then remove only if not in orders list
	try {
		const { productId } = req.params.productId

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
}

export const getAllCategories = async (_, res) => {
	try {
		const query = "SELECT * FROM get_categories_levelwise() ORDER BY name DESC";
		const result = await db.query(query);

		const categoryTree = buildCategoryTree(result.rows);

		res.json({
			success: true,
			categoryTree: categoryTree,
		});

	} catch (err) {
		console.error("Error fetching categories:", err);
		res.status(500).json({ error: "Internal Server error" });
	}
}

const buildCategoryTree = (categories) => {
	const categoryMap = new Map();

	categories.forEach(({ id, name }) => {
		categoryMap.set(id, { name, children: [] });
	});

	const rootCategories = [];
	categories.forEach(({ id, parent_id }) => {
		if (parent_id === null) {
			rootCategories.push(categoryMap.get(id));
		} else {
			if (categoryMap.has(parent_id)) {
				categoryMap.get(parent_id).children.push(categoryMap.get(id));
			}
		}
	});

	return rootCategories;
};

export const getAllTags = async (_, res) => {
	try {
		const tagsQuery = "SELECT * FROM tags";
		const tagsResult = await db.query(tagsQuery);

		res.json({
			success: true,
			tags: tagsResult.rows,
		});

	} catch (err) {
		console.error("Error fetching tags:", err);
		res.status(500).json({ error: "Internal Server error" });
	}
}

export const patchProduct = async (req, res) => {
	try {
		const productId = req.params.productId

		const { name, price, category, tags } = req.body

		if (!isValidNumeric(price)) {
			res.status(400).json({
				success: false,
				error: "Enter a Valid Number"
			});

			return
		}

		// TODO: Add Category and Tags updates
		const updateQuery = "UPDATE products \
			SET \
			name = $1, \
			price = $2 \
			WHERE product_id = $3 \
			RETURNING * \
		";

		const updateResult = await db.query(
			updateQuery,
			[name, parseFloat(price), productId]
		);

		res.json({
			success: !!updateResult.rowCount,
			updatedProduct: updateResult.rows[0]
		});

	} catch (err) {
		console.error("Error Updating Product:", err);
		res.status(500).json({ error: "Internal Server error" });
	}
}
