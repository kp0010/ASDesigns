import React, { useState, useEffect } from 'react'
import { Item } from '@/Components/Item/Item'
import "./Featured_Products.css"

export const Featured_Products = () => {

	const [featuredProd, setFeaturedProd] = useState([])
	const [loaded, setLoaded] = useState(false)

	const params = new URLSearchParams({
		"orderBy": "default",
		"limit": 4
	})

	const getFeaturedProducts = () => {
		fetch(`/api/products/?${params.toString()}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((resp) => resp.json())
			.then((data) => {
				setFeaturedProd([...data["products"]])
				setLoaded(true)
			})
	}

	useEffect(() => {
		getFeaturedProducts()
	}, [])

	const placeholderProd = {
		product_id: "XX_XXX",
		name: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
		price: "XXX"
	}

	return (
		<>
			<div className="text-center">
				<h1 className="text-5xl pt-4 mb-10" style={{ fontFamily: "DM Sans" }}>
					Our Featured Products
				</h1>
			</div>
			<div className="product-grid-container">
				{loaded ? (
					featuredProd.map((el, i) => (
						<Item product={el} key={i} />
					))
				) : (
					Array.from({ length: 4 }).map((_, i) => (
						<Item product={placeholderProd} key={i} />
					)))}
			</div>

		</>
	)
}
