import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../ui/button';

import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

const CartProductItem = ({ product, handleClick, removeFromCart, buyNowProductId }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = (productId) => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(productId);
      setIsRemoving(false)
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="cards bg-white pt-2 w-[90%] rounded-lg flex flex-col md:flex-row items-center md:items-start mb-3"
    >
      <Link
        to={`/product/${product.product_id}`}
        onClick={handleClick}
      >
        <div className="mt-4">
          <div className="productDiplay-img h-[200px] w-[200px] md:ml-8">
            <img
              src={`/Products/${product.product_id}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>
      </Link>

      <div className="md:ml-10 flex flex-col items-center justify-start md:items-start text-center md:text-left w-full">
        <Link
          to={`/product/${product.product_id}`}
          onClick={handleClick}
        >
          <h2 className="text-2xl mt-4 break-words md:text-left">
            {product.product_id +
              (product["name"] ? " | " + product["name"] : "")}
          </h2>
        </Link>

        <div className="price flex flex-col md:flex-row mt-3 items-center">
          <h1 className="new-price font-bold text-2xl md:mr-4">
            ₹ {(parseFloat(product.price) - 1.0).toFixed(2)}
          </h1>
          <h1 className="old-price text-xl line-through">
            ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
          </h1>
          <h3 className="text-xl md:ml-3">(-40% off)</h3>
        </div>

        <div className="remove-sec mt-3">
          {!buyNowProductId && (
            <Button
              onClick={() => handleRemove(product.product_id)}
              className="w-full md:w-40 text-sm bg-white text-black border-2 border-black flex items-center justify-center"
            >
              <FaRegTrashAlt /> Remove
            </Button>
          )}
        </div>
      </div>
    </motion.div >
  )
}

export default CartProductItem
