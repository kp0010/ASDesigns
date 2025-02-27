import React, { useState, useEffect } from "react";
import "./Shop_Item.css";
import { useNavigate, Link } from "react-router-dom";

import { useShop } from "@/Context/ShopContext";

import { IoCart, IoCartOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { PiEyeDuotone } from "react-icons/pi";

import { toast } from "sonner";
import ProductModal from "../ProductModal/ProductModal";

export const Shop_Item = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { product_id, name, price } = product;

  const {
    wishlistData,
    wishlistLoaded,
    deleteFromWishlist,
    addToWishlist,
    refreshWishlist,
  } = useShop();

  const { cartData, cartLoaded, deleteFromCart, addToCart, refreshCart } =
    useShop();

  const [wishlistCurrent, setWishlistCurrent] = useState(false);
  const [cartCurrent, setCartCurrent] = useState(false);

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
    const foundCartProd = cartData.find(
      (prod) => prod.product_id == product_id
    );
    const foundWSProd = wishlistData.find(
      (prod) => prod.product_id == product_id
    );

    setWishlistCurrent(foundWSProd != undefined);
    setCartCurrent(foundCartProd != undefined);
  }, [cartData, wishlistData, product_id]);

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavoir: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shop_item">
      <div className="shop_item-image">
        <Link onClick={handleClick} to={`/products/${product_id}`}>
          <img src={`/Products/${product_id}.jpeg`} alt="..." />
        </Link>

        <div className="shop_item-hover-container">
          <button onClick={toggleCart}>
            <i>
              {cartLoaded && cartCurrent ? (
                <IoCart className="item-icon" />
              ) : (
                <IoCartOutline className="item-icon" />
              )}
            </i>
            <span>{cartCurrent ? "Remove" : "Add to Cart"}</span>
          </button>

          {/* TODO: Try to add div or span tag instead of button  */}
          <ProductModal
            product={product}
            triggerButton={
              <button>
                <i>
                  <PiEyeDuotone className="item-icon" />
                </i>
                <span>Quick View</span>
              </button>
            }
          />
        </div>
        <div className="shop_item-wishlist">
          <span className="wishlist-text">
            {cartCurrent ? "Remove from Wishlist" : "Add to Wishlist"}
          </span>
          <button
            className="shop_item-wishlist-button"
            onClick={toggleWishlist}
          >
            <i>
              {wishlistLoaded && wishlistCurrent ? (
                <FaHeart className="item-icon" />
              ) : (
                <FaRegHeart className="shop_item-icon" />
              )}
            </i>
          </button>
        </div>
      </div>

      <Link onClick={handleClick} to={`/products/${product_id}`}>
        <div className="shop_item-content">
          <h2>{product_id + (name ? " | " + name : "")}</h2>
        </div>
        <div className="shop_item-price">
          <h2>₹ {(parseFloat(price) - 1.0).toFixed(2)}</h2>
        </div>
      </Link>
    </div>
  );
};
