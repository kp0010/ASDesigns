import React, { useState, useEffect } from "react"

import { Button } from "../ui/button";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useShop } from "@/Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

export const WishlistProducts = () => {

  const {
    wishlistData,
    wishlistLoaded,
    deleteFromWishlist,
    refreshWishlist
  } = useShop()

  useEffect(() => {
    refreshWishlist()
  }, [])


  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavoir: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  const removeFromWishilst = async (productId) => {
    refreshWishlist()
    console.log(productId)
    deleteFromWishlist(productId)
    refreshWishlist()
    // setWishlist([...wishlist.filter(prod => prod.product_id !== productId)])
  }

  return (
    <div className="wish bg-[#edeae7] flex flex-col items-center">
      <h2 className="text-4xl text-center pt-10 mb-5">Your Wishlists</h2>
      {wishlistLoaded && wishlistData.map((product, idx) => (
        <div key={idx} className="cards bg-white pt-2 w-[80%] rounded-lg flex  mb-5 ">
          <div className="product-display-left mt-4">
            <Link to={`/product/${product.product_id}`} onClick={handleClick}>
              <div className="productDiplay-img h-[200px] w-[200px] ml-8">
                <img
                  src={`/Products/${product.product_id}.jpeg`}
                  className="product-display-main-img rounded-lg"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="product-display-right ml-28">
            <Link to={`/product/${product.product_id}`} onClick={handleClick}>
              <h2 className="text-2xl mt-4">
                {product.product_id + (product["name"] ? " | " + product["name"] : "")}
              </h2>
            </Link>

            <div className="price flex mt-3 items-center">
              <h1 className="new-price font-bold text-2xl mr-4">
                ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
              </h1>
              <h1 className="old-price text-xl line-through">
                ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
              </h1>
              <h3 className="text-xl ml-3">(-40% off)</h3>
            </div>
            <div className="buy-section mt-5">
              <Button className="mr-3 w-72 md:mb-3 bg-black">
                <IoCartOutline /> Add to Cart
              </Button>
              <Button className="w-72 mr-3 md:mb-3 bg-[#e3c756]">
                <IoCloudDownloadOutline /> Download
              </Button>
              <Button onClick={() => { removeFromWishilst(product.product_id) }} className="w-40 mr-3 md:mb-3 bg-white text-black border-2 border-black">
                <FaRegTrashAlt /> Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
