import React from "react";

import { CartProducts } from "@/Components/CartProducts/CartProducts";
import { useLocation } from "react-router-dom";

export const Cart = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const buyNow = params.get("buyNow")

  return <CartProducts buyNowProduct={buyNow} />;
};
