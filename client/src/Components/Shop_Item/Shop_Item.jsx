import React from 'react'
import "./Shop_Item.css"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

export const Shop_Item = ({ product }) => {
  return (
    <div className="shop_item">
      <div className="shop_item-image">
        {/* Link to product */}
        <img src={`/Products/${product.product_id}.jpeg`} alt="..." />
        <div className="shop_item-hover-container">
          <a href="">
            <i>
              <LuShoppingCart className="item-icon" />
            </i>
            <span>Add to Cart</span>
          </a>
          <a href="">
            <i>
              <PiEyeDuotone className="item-icon" />
            </i>
            <span>Quick View</span>
          </a>
        </div>
        <div className="shop_item-wishlist">
          <span className="wishlist-text">Add to Wishlist</span>
          <button className="shop_item-wishlist-button">
            <i>
              <FaRegHeart className='shop_item-icon' />
            </i>
          </button>
        </div>
      </div>

      {/* link  */}
      <div className="shop_item-content">
        <h2>{product["product_id"] + (product["name"] ? " | " + product["name"] : "")}</h2>
      </div>
      <div className="shop_item-price">
        <h2>₹ {(parseFloat(product.price) - 1.0).toFixed(2)}</h2>
      </div>
    </div>
  )
}
