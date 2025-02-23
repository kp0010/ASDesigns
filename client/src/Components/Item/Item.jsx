import React, { useEffect, useState } from 'react'
import "./Item.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

import { useShop } from "@/Context/ShopContext";


export const Item = ({ product }) => {
    const { product_id, name, price } = product

    const [wishlistCurrent, setWishlistCurrent] = useState(false)

    const {
        wishlistData,
        deleteFromWishlist,
        addToWishlist,
        refreshWishlist
    } = useShop()

    const toggleWishlist = () => {
        if (wishlistCurrent) {
            deleteFromWishlist(product_id)
        } else {
            addToWishlist(product_id)
        }
        refreshWishlist()
    }

    useEffect(() => {
        const foundProd = wishlistData.find(prod => prod.product_id == product_id)
        setWishlistCurrent((foundProd != undefined))
    }, [wishlistData, product_id])

    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavoir: "smooth" });
        const splitLink = event.currentTarget.href.split("/");
        const productId = splitLink[splitLink.length - 1];
        navigate(`/product/${productId}`);
    };

    return (
        <div className="item">
            <div className="item-image">
                <Link to={`/product/${product_id}`} onClick={handleClick}>
                    <img src={`/Products/${product_id}.jpeg`} alt="..." />
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

                    {/* modal will be opened by clicking on quick view */}
                    <button href="" className="item-icons-container d-flex rounded-full">
                        <i>
                            <PiEyeDuotone className="item-icon" />
                        </i>
                        <span className="item-icon-tag">Quick View</span>
                    </button>

                    {/* TODO: wishlist count pending */}
                    <button onClick={toggleWishlist} className="item-icons-container d-flex rounded-full">
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
            <Link to={`/product/${product_id}`}>
                <div className="item-content">
                    <h2>{product_id + (name ? " | " + name : "")}</h2>
                </div>
                <div className="item-price">
                    <h2>₹ {(parseFloat(price) - 1.0).toFixed(2)}</h2>
                </div>
            </Link>
        </div>
    )
}
