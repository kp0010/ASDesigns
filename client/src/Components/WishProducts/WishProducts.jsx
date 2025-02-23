import prod_img from "../../../public/Products/JD001.jpeg";
import { Button } from "../ui/button";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

export const WishProducts = () => {
  return (
    <div className="wish bg-[#edeae7] flex flex-col items-center">
      <h2 className="text-4xl text-center pt-10 mb-5">Your Wishlists</h2>

      <div className="cards bg-white pt-2 w-[80%] rounded-lg flex flex-col md:flex-row items-center md:items-start mb-5 p-4">
        <div className="product-display-left mt-4">
          <div className="productDiplay-img h-[200px] w-[200px] md:ml-8">
            <img
              src={prod_img}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>

        <div className="product-display-right md:ml-20 ">
            <h2 className="text-2xl mt-4 break-words ml-9 md:ml-0 md:text-left lg:text-left" > JD001 | Ultralight Festival Jersey</h2>


          <div className="price flex flex-col md:flex-row mt-3 items-center">
            <h1 className="new-price font-bold text-2xl md:mr-4">₹499.90</h1>
            <h1 className="old-price text-xl line-through">₹699.90</h1>
            <h3 className="text-xl md:ml-3">(-40% off)</h3>
          </div>

          <div className="buy-section mt-5 flex flex-col md:flex-col lg:flex-row xl:flex-row md:flex-wrap md:justify-start gap-2 w-full">
            <Button className="w-full md:w-60 text-sm py-2 bg-black flex items-center justify-center mr-3">
              <IoCartOutline /> Add to Cart
            </Button>
            <Button className="w-full md:w-60 xl:w-70 lg:w-50 text-sm py-2 bg-[#e3c756] flex items-center justify-center mr-3">
              <IoCloudDownloadOutline /> Download
            </Button>
            <Button className="w-full md:w-32 text-sm py-2 bg-white text-black border-2 border-black flex items-center justify-center mr-3">
              <FaRegTrashAlt /> Remove
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
};
