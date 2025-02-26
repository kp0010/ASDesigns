import React from 'react'
import "./Shop_Item.css"
import exp_1 from "../../Assets/JD001.jpeg"

import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

export const Shop_Item = () => {
  return (
    <div className="shop_item">
      <div className="shop_item-image">
        {/* Link to product */}
        <img src={exp_1} alt="..." />
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
        <h2>JD001 | Eco-friendly cricket jersey</h2>
      </div>
      <div className="shop_item-price">
        <h2>₹ 500.00</h2>
      </div>
    </div>
  )
}
