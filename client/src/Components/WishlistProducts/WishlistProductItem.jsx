import React, { useState } from 'react'

import { Button } from "../ui/button";

import { FaRegTrashAlt } from "react-icons/fa";

import AddToCart from "../ui/addToCartBtn";
import Download from "../ui/downloadBtn";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      className="cards bg-white pt-2 w-[80%] rounded-lg flex flex-col md:flex-row items-center md:items-start mb-3 p-4"
    >
      <Link to={`/product/${product.product_id}`} onClick={handleClick}>
        <div className="product-display-left mt-4">
          <div className="productDiplay-img h-[200px] w-[200px] md:ml-8">
            <img
              src={`/Products/${product.product_id}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>
      </Link>

      <div className="product-display-right md:ml-20 ">
        <Link to={`/product/${product.product_id}`} onClick={handleClick}>
          <h2 className="text-2xl mt-4 break-words ml-9 md:ml-0 md:text-left lg:text-left" >{product["product_id"] + (product["name"] ? " | " + product["name"] : "")}</h2>
        </Link>


        <div className="price flex flex-col md:flex-row mt-3 items-center">
          <h1 className="new-price font-bold text-2xl md:mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
          <h1 className="old-price text-xl line-through">₹{(parseFloat(product.price) + 200.0).toFixed(2)}</h1>
          <h3 className="text-xl md:ml-3">(-40% off)</h3>
        </div>

        <div className="buy-section mt-5 flex flex-col md:flex-col lg:flex-row xl:flex-row md:flex-wrap md:justify-start gap-2 w-full">
          <AddToCart className="w-full md:w-60 text-sm py-2 flex items-center justify-center mr-3" product={product} />
          <Download className="w-full md:w-60 xl:w-70 lg:w-50 text-sm py-2 bg-[#e3c756] flex items-center justify-center mr-3" productId={product.product_id} />
          <Button
            onClick={() => handleRemove(product.product_id)}
            className="w-full md:w-32 text-sm py-2 bg-white text-black border-2 border-black flex items-center justify-center"
          >
            <FaRegTrashAlt /> Remove
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default WishlistProductItem

