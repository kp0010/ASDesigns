import React, { useEffect, useState } from 'react'

import "../Related_Products/Related_Products.css"
import "./Product_Carousel_Item.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { CarouselItem } from '../ui/carousel';

import { Link, useNavigate } from "react-router-dom";
import { useShop } from "@/Context/ShopContext";

export const Product_Carousel_Item = ({ product, getFeaturedProducts }) => {
	const {
		wishlistData,
		wishlistLoaded,
		deleteFromWishlist,
		addToWishlist,
		refreshWishlist,
	} = useShop()

	const [wishlistCurrent, setWishlistCurrent] = useState(false)

	const toggleWishlist = () => {
		if (wishlistCurrent) {
			setWishlistCurrent(false)
			deleteFromWishlist(product.product_id)
		} else {
			setWishlistCurrent(true)
			addToWishlist(product.product_id)
		}
		refreshWishlist()
	}

	useEffect(() => {
		const foundProd = wishlistData.find(prod => prod.product_id == product.product_id)
		setWishlistCurrent((foundProd !== undefined))
	}, [wishlistLoaded, product, wishlistData])

	const navigate = useNavigate()

	const handleClick = (event) => {
		event.preventDefault();
		getFeaturedProducts()
		window.scrollTo({ top: 0, behavoir: "smooth" });
		const splitLink = event.currentTarget.href.split("/");
		const productId = splitLink[splitLink.length - 1];
		navigate(`/product/${productId}`);
	};

	return (
		<CarouselItem
			className="car-con md:basis-1/2 pl-4 lg:basis-1/3 pl-0 xl:basis-1/4 "
		>
			<div className="p-1">
				<div className="carousel_item bg-white mb-5 ">
					<div className="carousel_item-image">
						<Link to={`/product/${product.product_id}`} onClick={handleClick}>
							<img src={`/Products/${product.product_id}.jpeg`} alt="..." />
						</Link>
						<div className="carousel_item-hover-container">
							<Link to="/cart">
								<button className="carousel_item-icons-container d-flex rounded-full">
									<i>
										<LuShoppingCart className="carousel_item-icon" />
									</i>
									<span className="carousel_item-icon-tag">Add to Cart</span>
								</button>
							</Link>

							<button
								href=""
								className="carousel_item-icons-container d-flex rounded-full"
							>
								<i>
									<PiEyeDuotone className="carousel_item-icon" />
								</i>
								<span className="carousel_item-icon-tag">Quick View</span>
							</button>

							<button
								onClick={toggleWishlist}
								className="carousel_item-icons-container d-flex rounded-full"
							>
								<i>
									{wishlistCurrent ? (
										<FaHeart className='carousel_item-icon' />
									) : (
										<FaRegHeart className="carousel_item-icon" />
									)}
								</i>
								<span className="carousel_item-icon-tag">Wishlist</span>
							</button>
						</div>
					</div>

					<Link to={`/product/${product.product_id}`} onClick={handleClick}>
						<div className="carousel_item-content">
							<h2>{product["product_id"] + (product["name"] ? " | " + product["name"] : "")}</h2>
						</div>
						<div className="carousel_item-price">
							<h2>₹{(parseFloat(product["price"]) - 1.0).toFixed(2)}</h2>
						</div>
					</Link>
				</div>
			</div>
		</CarouselItem>
	)
}

