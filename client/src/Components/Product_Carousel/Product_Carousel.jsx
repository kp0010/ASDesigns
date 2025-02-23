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
				setRelatedProducts([...data])
				setLoaded(true)
			})
	}

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}, 10);
		getFeaturedProducts()
	}, [loaded])

	return (
		< Carousel
			opts={{
				align: "start",
			}}
			className="md:w-[80%] sm:w-full md:ml-40 ml-12"
		>
			<CarouselContent>
			</CarouselContent>
			{loaded && relatedProducts.map((el, idx) => (
				<Product_Carousel_Item key={idx} product={el} />
			))}
			<CarouselPrevious />
			<CarouselNext className="md:ml-5 lg:ml-5" />
		</Carousel >
	)
}
