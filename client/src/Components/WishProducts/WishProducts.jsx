import prod_img from "../../../public/Products/JD001.jpeg";
import { Button } from "../ui/button";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";


export const WishProducts = () => {
  return (
    <div className="wish bg-[#edeae7] flex flex-col items-center">
      <h2 className="text-4xl text-center pt-10 mb-5">Your Wishlists</h2>
      <div className="cards bg-white pt-2 w-[80%] rounded-lg flex  mb-5 ">
        <div className="product-display-left mt-4">
          <div className="productDiplay-img h-[200px] w-[200px] ml-8">
            <img
              src={prod_img}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>
        <div className="product-display-right ml-28">
          <h2 className="text-2xl mt-4">
            JD001 | Ultra Lightweight Festival Jersey
            {/* {productId + (product["name"] ? " | " + product["name"] : "")} */}
          </h2>

          <div className="price flex mt-3 items-center">
            <h1 className="new-price font-bold text-2xl mr-4">
              ₹499.90
              {/* ₹{(parseFloat(product.price) - 1.0).toFixed(2)} */}
            </h1>
            <h1 className="old-price text-xl line-through">
              ₹699.90
              {/* ₹{(parseFloat(product.price) + 200.0).toFixed(2)} */}
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
            <Button className="w-40 mr-3 md:mb-3 bg-white text-black border-2 border-black">
              <FaRegTrashAlt /> Remove
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
};
