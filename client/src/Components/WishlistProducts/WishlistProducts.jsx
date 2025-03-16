import React, { useEffect } from "react"

import { useShop } from "@/Context/ShopContext";
import { useNavigate } from "react-router-dom";

import { useAuth, useClerk } from "@clerk/clerk-react"
import { toast } from "sonner";

import WishlistProductItem from './WishlistProductItem'

export const WishlistProducts = () => {

  const { isLoaded, isSignedIn } = useAuth()
  const { redirectToSignIn } = useClerk()

  const {
    wishlistData,
    wishlistLoaded,
    deleteFromWishlist,
    refreshWishlist
  } = useShop()

  useEffect(() => {
    refreshWishlist()
    if (isLoaded) {
      if (!isSignedIn) {
        redirectToSignIn()
      }
    }
  }, [isLoaded, isSignedIn])

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavoir: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  const removeFromWishlist = async (productId) => {
    toast.info("Removed from Wishlist")
    refreshWishlist()
    deleteFromWishlist(productId)
    refreshWishlist()
  }

  return (
    <div className="wish pb-5 bg-[#edeae7] flex flex-col items-center min-h-screen">
      <h2 className="text-5xl text-center pt-10 mb-5 mt-1">{wishlistLoaded && wishlistData.length ? "Your Favourites" : "No Favourites Yet"}</h2>
      {wishlistLoaded && wishlistData.length ? (
        wishlistLoaded && wishlistData.map((product, idx) => (
          <div className="cards bg-white pt-2 w-[80%] rounded-lg flex flex-col md:flex-row items-center md:items-start mb-3 p-4">
            <WishlistProductItem key={idx} product={product} handleClick={handleClick} removeFromWishlist={removeFromWishlist} />
          </div>
        ))
      ) : (<h1 className="mt-2 ml-6 mr-6 text-2xl">Find what you love and save it for later!</h1>)}
    </div>
  );
};
