import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { IoCloudDownloadOutline } from "react-icons/io5";

import { useShop } from "@/Context/ShopContext";
import { useAuth, useClerk } from "@clerk/clerk-react";
import styled from "styled-components";

import { toast } from "sonner";

import CartProductItem from "./CartProductItem";

export const CartProducts = ({ buyNowProduct: buyNowProductId }) => {
  const { isLoaded, isSignedIn } = useAuth();

  const { redirectToSignIn } = useClerk();

  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const { cartData, cartLoaded, deleteFromCart, refreshCart, price } =
    useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavoir: "smooth" });

    if (isLoaded) {
      if (!isSignedIn) {
        redirectToSignIn();
      }
    }

    if (buyNowProductId) {
      fetch(`/api/products/${buyNowProductId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            setBuyNowProduct(data.product);
          }
        });
    } else {
      refreshCart();
    }
  }, [isLoaded, isSignedIn, price]);

  const navigate = useNavigate();
  const StyledDiv = styled.div`
    margin-top: 1.25rem; /* Default for small screens */

    @media (min-width: 1024px) {
      margin-top: 0;
    }
  `;

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavoir: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  const removeFromCart = async (productId) => {
    toast.success("Removed from Cart");
    refreshCart();
    deleteFromCart(productId);
    refreshCart();
  };

  return (
    <div className="cart bg-[#edeae7] min-h-screen flex flex-col items-center pb-5">
      <h2 className="text-5xl text-center pt-10 mb-5 mt-1">
        Your Cart {cartLoaded && !cartData.length && "is Empty"}
      </h2>

      {cartLoaded && cartData.length ? (
        <div className="product-info flex flex-col lg:flex-row justify-center w-full px-4">
          {/* Wrap All Products Inside One Cards Div */}
          <div className="cards bg-white rounded-lg p-4 flex flex-col w-full lg:w-3/5">
            {cartLoaded &&
              (!buyNowProductId || buyNowProduct) &&
              { true: [buyNowProduct], false: cartData }[!!buyNowProductId].map(
                (product, idx) => (
                  <div className="w-full flex flex-col md:flex-row items-center border-b pb-4 last:border-none">
                    <CartProductItem
                      key={idx}
                      product={product}
                      handleClick={handleClick}
                      removeFromCart={removeFromCart}
                      buyNowProductId={buyNowProductId}
                    />
                  </div>
                )
              )}
          </div>

          {/* Order Summary (Separate Like Before) */}
          <StyledDiv className="total-price-right bg-white rounded-lg flex flex-col items-center justify-evenly p-6 w-full lg:w-[400px] lg:h-[250px] lg:ml-10">
            <h2 className="text-xl font-bold pt-4 md:pt-0">Order Summary</h2>

            {/* Price Section with Left-Right Alignment */}
            <div className="price w-full pt-4 md:pt-0">
              <div className="flex justify-between w-full text-lg">
                <h2>Price ({buyNowProductId ? 1 : cartData.length} items)</h2>
                <span className="font-bold">
                  ₹{" "}
                  {(
                    (buyNowProduct !== null ? buyNowProduct.price : price) -
                    1.0 * (buyNowProduct !== null ? 1 : cartData.length)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between w-full text-lg mt-2">
                <h2>Total Price</h2>
                <span className="font-bold">
                  ₹{" "}
                  {(
                    (buyNowProduct !== null ? buyNowProduct.price : price) -
                    1.0 * (buyNowProduct !== null ? 1 : cartData.length)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="buy-sec flex justify-center w-full">
              <Button className="w-full md:w-72 bg-[#e3c756] mt-4 mb-10">
                <IoCloudDownloadOutline /> Place Order
              </Button>
            </div>
          </StyledDiv>
        </div>
      ) : (
        <h1 className="mt-2 text-2xl">
          Pick your favorite items and come back here to check out
        </h1>
      )}
    </div>
  );
};
