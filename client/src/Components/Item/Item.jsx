import React from 'react'
import "./Item.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";

export const Item = ({ product }) => {
    const { product_id, name, price } = product
    console.log(product_id, product_id.length)

    const imageSrc = `./src/Assets/Products/${product_id}.jpeg`
    console.log(imageSrc, imageSrc.length)

    return (
        <div className="item">
            {/* TODO: onclick link to product page  */}
            {/* TODO: need to add props */}
            <a href={`/product/${product_id}`}>
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
                        <button href="" className="item-icons-container d-flex rounded-full">
                            <i>
                                <FaRegHeart className="item-icon" />
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
                    <h2>₹ {parseFloat(price).toFixed(2) - 1}</h2>
                </div>
            </a>

        </div>
    )
}
