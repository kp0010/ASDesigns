import React, { useState } from 'react'

import { Button } from "../ui/button";

import { FaRegTrashAlt } from "react-icons/fa";

import AddToCart from "../ui/addToCartBtn";
import Download from "../ui/downloadBtn";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WishlistProductsItem.css';

const WishlistProductItem = ({ product, handleClick, removeFromWishlist }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async (productId) => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromWishlist(productId)
      setIsRemoving(false)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="cards bg-white pt-2 md:mr-0 w-[100%] rounded-lg flex flex-col md:flex-row items-center md:items-start mb-2 p-4 md:pr-0"
    >
      <Link to={`/product/${product.product_id}`} onClick={handleClick}>
        <div className="product-display-left mt-4">
          <div className="productDiplay-img h-[200px] w-[200px] lg:ml-8">
            <img
              src={`/Products/${product.product_id}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>
      </Link>

      <div className="product-display-right md:ml-10 lg:ml-20">
        <Link to={`/product/${product.product_id}`} onClick={handleClick}>
          <h2 className="text-2xl mt-4 break-words md:ml-0 custom-text-center  md:text-left" >{product["product_id"] + (product["name"] ? " | " + product["name"] : "")}</h2>
        </Link>


        <div className="price flex flex-col md:flex-row mt-3 items-center">
          <h1 className="new-price font-bold text-2xl md:mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
          <h1 className="old-price text-xl line-through">₹{(parseFloat(product.price) + 200.0).toFixed(2)}</h1>
          <h3 className="text-xl md:ml-3">(-40% off)</h3>
        </div>

        <div className="buy-section custom-flex-wrap mt-5 flex flex-col md:flex-col lg:flex-row xl:flex-row md:flex-wrap lg:flex-nowrap xl:flex-nowrap md:justify-start gap-2 w-full">
          <AddToCart className="w-full md:w-60 text-sm py-2  mr-3" product={product} />
          <Download className="w-full md:w-60  text-sm py-2 bg-[#e3c756] mr-3" productId={product.product_id} />
          <Button
            onClick={() => handleRemove(product.product_id)}
            className="w-full md:w-32 text-sm py-2 bg-white text-black border-2 border-black"
          >
            <FaRegTrashAlt /> Remove
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default WishlistProductItem

