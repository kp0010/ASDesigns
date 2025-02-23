import React, { useEffect, useState } from 'react'

import "../Related_Products/Related_Products.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { CarouselItem } from '../ui/carousel';

import { Link } from "react-router-dom";
import { useShop } from "@/Context/ShopContext";

export const Product_Carousel_Item = ({ product }) => {
	const [wishlistCurrent, setWishlistCurrent] = useState(false)

	const {
		wishlistData,
		deleteFromWishlist,
		addToWishlist,
		refreshWishlist
	} = useShop()

	const toggleWishlist = () => {
		if (wishlistCurrent) {
			deleteFromWishlist(product.product_id)
		} else {
			addToWishlist(product.product_id)
		}
		refreshWishlist()
	}

	useEffect(() => {
		const foundProd = wishlistData.find(prod => prod.product_id == product.product_id)
		setWishlistCurrent((foundProd != undefined))
	}, [wishlistData, product.product_id])


	return (
		<CarouselItem
			className="car-con md:basis-1/2 lg:basis-1/3 xl:basis-1/4 "
		>
			<div className="p-1">
				<div className="item bg-white mb-5 ">
					<div className="item-image">
						<Link to={`/product/${product.product_id}`} onClick={() => { setLoaded(false) }}>
							<img src={`/Products/${product.product_id}.jpeg`} alt="..." />
						</Link>
						<div className="item-hover-container">
							<Link to="/cart">
								<button className="item-icons-container d-flex rounded-full">
									<i>
										<LuShoppingCart className="item-icon" />
									</i>
									<span className="item-icon-tag">Add to Cart</span>
								</button>
							</Link>

							<button
								href=""
								className="item-icons-container d-flex rounded-full"
							>
								<i>
									<PiEyeDuotone className="item-icon" />
								</i>
								<span className="item-icon-tag">Quick View</span>
							</button>

							<button
								onClick={toggleWishlist}
								className="item-icons-container d-flex rounded-full"
							>
								<i>
									{wishlistCurrent ? (
										<FaHeart className='item-icon' />
									) : (
										<FaRegHeart className="item-icon" />
									)}
								</i>
								<span className="item-icon-tag">Wishlist</span>
							</button>
						</div>
					</div>

					<Link to={`/product/${product.product_id}`} onClick={() => { setLoaded(false) }}>
						<div className="item-content">
							<h2>{product["product_id"] + (product["name"] ? " | " + product["name"] : "")}</h2>
						</div>
						<div className="item-price">
							<h2>₹{(parseFloat(product["price"]) - 1.0).toFixed(2)}</h2>
						</div>
					</Link>
				</div>
			</div>
		</CarouselItem>
	)
}

