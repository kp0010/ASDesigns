import React from "react";

import './Related_Products.css';
import { Product_Carousel } from "../Product_Carousel/Product_Carousel";

export const Related_Products = () => {

  return (
    <div className="prod-list bg-[#edeae7]">
      <h2 className="text-5xl ml-0 pt-4 mb-8 text-center">
        Similar Products
      </h2>
      <Product_Carousel />
    </div >
  );
};
