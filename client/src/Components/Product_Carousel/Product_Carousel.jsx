import React, { useState, useEffect } from "react";

import "../Related_Products/Related_Products.css"

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/Components/ui/carousel";

import { Product_Carousel_Item } from "./Product_Carousel_Item";

export const Product_Carousel = () => {
	const [relatedProducts, setRelatedProducts] = useState([])
	const [loaded, setLoaded] = useState(false)

	const params = new URLSearchParams({
		"orderBy": "default",
		"limit": 8,
	})

	const getFeaturedProducts = () => {
		fetch(`/api/products/?${params.toString()}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((resp) => resp.json())
			.then((data) => {
				setRelatedProducts([...data["products"]])
				setLoaded(true)
			})
	}

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}, 10);
		getFeaturedProducts()
	}, [])

	return (
		< Carousel
			opts={{
				align: "start",
			}}
			className="md:w-[90%] md:ml-20 lg:w-[85%] xl:w-[90%] sm:w-full ml-12"
		>
			<CarouselContent>
				{loaded && relatedProducts.map((el, idx) => (
					<Product_Carousel_Item key={idx} product={el} getFeaturedProducts={getFeaturedProducts} />
				))}
			</CarouselContent>

			<CarouselPrevious />
			<CarouselNext className="position-absolute  md:ml-16 lg:ml-5" />
		</Carousel >
	)
}
