import React from 'react'
import "./Item.css"
import sample_img from "../../Assets/sample_product_img.png"

export const Item = () => {
    return (
        <div className="item">
            {/* onclick link to product page  */}
            <div className="item-image">
                <img src={sample_img} alt="..." />
                <div className="item-hover-container">
                    <a href=""><span>ADD To Cart</span></a>
                </div>
            </div>
            <div className="item-content">
                <a href="#product">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                </a>
            </div>
            <div className="item-price">
                <h2>Rs 200</h2>
            </div>
        </div>
    )
}
