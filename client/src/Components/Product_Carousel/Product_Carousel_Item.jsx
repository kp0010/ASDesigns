import React, { useEffect, useState } from "react";

import "../Related_Products/Related_Products.css";
import "./Product_Carousel_Item.css";

import { IoCart, IoCartOutline } from "react-icons/io5";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { CarouselItem } from "../ui/carousel";

import { Link, useNavigate } from "react-router-dom";
import { useShop } from "@/Context/ShopContext";
import ProductModal from "../ProductModal/ProductModal";

export const Product_Carousel_Item = ({ product, getFeaturedProducts }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const {
		wishlistData,
		wishlistLoaded,
		deleteFromWishlist,
		addToWishlist,
		refreshWishlist,
	} = useShop();

	const {
		cartData,
		cartLoaded,
		deleteFromCart,
		addToCart,
		refreshCart
	} = useShop()

	const [wishlistCurrent, setWishlistCurrent] = useState(false)
	const [cartCurrent, setCartCurrent] = useState(false)

	const toggleCart = () => {
		if (cartCurrent) {
			setCartCurrent(false);
			deleteFromCart(product.product_id);
			toast.info("Removed from Cart")
		} else {
			setCartCurrent(true);
			addToCart(product.product_id, product.price);
			toast.success("Added to Cart")
		}
		refreshCart();
	}
	const toggleWishlist = () => {
		if (wishlistCurrent) {
			setWishlistCurrent(false);
			deleteFromWishlist(product.product_id);
		} else {
			setWishlistCurrent(true);
			addToWishlist(product.product_id);
		}
		refreshWishlist();
	};

	useEffect(() => {
		const foundCartProd = cartData.find(prod => prod.product_id == product.product_id)
		const foundWSProd = wishlistData.find(prod => prod.product_id == product.product_id)

		setWishlistCurrent((foundWSProd != undefined))
		setCartCurrent((foundCartProd != undefined))

	}, [cartData, wishlistData, product])

	useEffect(() => {
		const foundProd = wishlistData.find(
			(prod) => prod.product_id == product.product_id
		);
		setWishlistCurrent(foundProd !== undefined);
	}, [wishlistLoaded, product, wishlistData]);

	const navigate = useNavigate();

	const handleClick = (event) => {
		event.preventDefault();
		getFeaturedProducts();
		window.scrollTo({ top: 0, behavoir: "smooth" });
		const splitLink = event.currentTarget.href.split("/");
		const productId = splitLink[splitLink.length - 1];
		navigate(`/product/${productId}`);
	};

	return (
		<CarouselItem
			className="car-con md:basis-1/2 pl-4 lg:basis-1/3 xl:basis-1/4 "
		>
			<div className="p-1">
				<div className="carousel_item bg-white mb-5 ">
					<div className="carousel_item-image">
						<Link to={`/product/${product.product_id}`} onClick={handleClick}>
							<img src={`/Products/${product.product_id}.jpeg`} alt="..." />
						</Link>
						<div className="carousel_item-hover-container">
							<button onClick={toggleCart} className="carousel_item-icons-container d-flex rounded-full">
								<i>
									{cartLoaded && cartCurrent ? (
										<IoCart className="item-icon" />
									) : (
										<IoCartOutline className="item-icon" />
									)}
								</i>
								<span className="carousel_item-icon-tag">Add to Cart</span>
							</button>

							<ProductModal
								product={product}
								triggerButton={
									<button className="item-icons-container d-flex rounded-full">
										<i>
											<PiEyeDuotone className="item-icon" />
										</i>
										<span className="item-icon-tag">Quick View</span>
									</button>
								}
							/>

							<button
								onClick={toggleWishlist}
								className="carousel_item-icons-container d-flex rounded-full"
							>
								<i>
									{wishlistCurrent ? (
										<FaHeart className="carousel_item-icon" />
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
							<h2>
								{product["product_id"] +
									(product["name"] ? " | " + product["name"] : "")}
							</h2>
						</div>
						<div className="carousel_item-price">
							<h2>₹{(parseFloat(product["price"]) - 1.0).toFixed(2)}</h2>
						</div>
					</Link>
				</div>
			</div>
		</CarouselItem>
	);
};
