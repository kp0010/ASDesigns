import React, { useEffect, useState } from "react";
import "./Item.css";

import { IoCart, IoCartOutline } from "react-icons/io5";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useShop } from "@/Context/ShopContext";
import ProductModal from "../ProductModal/ProductModal";

export const Item = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { product_id, name, price } = product;

  const [wishlistCurrent, setWishlistCurrent] = useState(false);
  const [cartCurrent, setCartCurrent] = useState(false);

  const {
    cartData,
    cartLoaded,
    deleteFromCart,
    addToCart,
    refreshCart
  } = useShop();

  const {
    wishlistData,
    wishlistLoaded,
    deleteFromWishlist,
    addToWishlist,
    refreshWishlist,
  } = useShop();

  const toggleWishlist = () => {
    if (wishlistCurrent) {
      setWishlistCurrent(false);
      deleteFromWishlist(product.product_id);
    } else {
      setWishlistCurrent(true);
      addToWishlist(product.product_id);
    }
    refreshWishlist();
  };

  const toggleCart = () => {
    if (cartCurrent) {
      setCartCurrent(false);
      deleteFromCart(product.product_id);
      toast.info("Removed from Cart");
    } else {
      setCartCurrent(true);
      addToCart(product.product_id, product.price);
      toast.success("Added to Cart");
    }
    refreshCart();
  };

  useEffect(() => {
    const foundCartProd = cartData.find((prod) => prod.product_id == product_id);
    const foundWSProd = wishlistData.find((prod) => prod.product_id == product_id);

    setWishlistCurrent(foundWSProd !== undefined);
    setCartCurrent(foundCartProd !== undefined);

  }, [cartData, wishlistData, product_id]);

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  return (
    <div className="item">
      <div className="item-image">
        <Link to={`/product/${product_id}`} onClick={handleClick}>
          <img src={`/api/assets/${product_id}.jpeg`} alt="..." />
        </Link>
        <div className="item-hover-container">
          <button
            onClick={toggleCart}
            className="item-icons-container d-flex rounded-full"
          >
            <i>
              {cartLoaded && cartCurrent ? (
                <IoCart className="item-icon" />
              ) : (
                <IoCartOutline className="item-icon" />
              )}
            </i>
            <span className="item-icon-tag">
              {cartLoaded && cartCurrent ? "Remove from Cart" : "Add to Cart"}
            </span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="item-icons-container d-flex rounded-full"
          >
            <i>
              <PiEyeDuotone className="item-icon" />
            </i>
            <span className="item-icon-tag">Quick View</span>
          </button>

          <button
            onClick={toggleWishlist}
            className="item-icons-container d-flex rounded-full"
          >
            <i>
              {wishlistLoaded && wishlistCurrent ? (
                <FaHeart className="item-icon" />
              ) : (
                <FaRegHeart className="item-icon" />
              )}
            </i>
            <span className="item-icon-tag">Wishlist</span>
          </button>
        </div>
      </div>

      <Link to={`/product/${product_id}`}>
        <div className="item-content">
          <h2>{product_id + (name ? " | " + name : "")}</h2>
        </div>
        <div className="item-price">
          <h2>₹ {(parseFloat(price) - 1.0).toFixed(2)}</h2>
        </div>
      </Link>

      {/* MODAL HERE */}
      {isModalOpen && (
        <ProductModal
          product={product}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};
