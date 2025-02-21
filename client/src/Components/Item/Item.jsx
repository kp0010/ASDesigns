import React, { useState } from 'react'
import "./Item.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';

export const Item = ({ product }) => {
    const { product_id, name, price } = product

    const [wishlistCurrent, setWishlistCurrent] = useState(false)

    const imageSrc = `/Products/${product_id}.jpeg`

    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        window.scrollTo({ top:0, behavoir:"smooth" });
        const splitLink = event.currentTarget.href.split("/");
        const productId = splitLink[splitLink.length - 1];
        navigate(`/product/${productId}`);
    };

    return (
        <div className="item">
            {/* TODO: onclick link to product page  */}
            {/* TODO: need to add props */}
            <Link to={`/product/${product_id}`} onClick={handleClick}>
                <div className="item-image">
                    <img src={imageSrc} alt="..." />
                    <div className="item-hover-container">
                        {/* TODO: will navigate to add to cart page on clicking the button */}
                        <button className="item-icons-container d-flex rounded-full">
                            <i>
                                <LuShoppingCart className="item-icon" />
                            </i>
                            <span className="item-icon-tag">Add to Cart</span>
                        </button>
                        <button href="" className="item-icons-container d-flex rounded-full">
                            <i>
                                <PiEyeDuotone className="item-icon" />
                            </i>
                            <span className="item-icon-tag">Quick View</span>
                        </button>
                        <button onClick={() => { setWishlistCurrent(!wishlistCurrent) }} className="item-icons-container d-flex rounded-full">
                            <i>
                                {wishlistCurrent ? (
                                    <FaHeart className='item-icon' />
                                ) : (
                                    <FaRegHeart className="item-icon" />
                                )}
                            </i>
                            <span className="item-icon-tag">Wishlist</span>
                            {/* TODO: wishlist toggle functionality pending */}
                        </button>
                    </div>
                </div>
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
