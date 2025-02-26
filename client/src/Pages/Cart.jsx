import { CartProducts } from "@/Components/CartProducts/CartProducts";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Cart = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const getProduct = () => {
    fetch(`/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data["product"]);
      });
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return <CartProducts product={product} productId={productId}/>;
};
