import React from 'react'
import "./Item.css"
import sample_img from "../../Assets/Products/sample_product_img.png"
import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";

export const Item = () => {
    return (
        <div className="item">
            {/* TODO: onclick link to product page  */}
            {/* TODO: need to add props */}
            <a href={`/product/${10}`}>
                <div className="item-image">
                    <img src={sample_img} alt="..." />
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
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                </div>
                <div className="item-price">
                    <h2>₹ 199.00</h2>
                </div>
            </a>

        </div>
    )
}
