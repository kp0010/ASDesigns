import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

export const ProductDisplay = (props) => {
  const { productId, product, categories } = props

  const [wishlistCurrent, setWishlistCurrent] = useState(false)

  const toggleWishlist = () => {
    // TODO: Add Database query to add to wishlist

    setWishlistCurrent(!wishlistCurrent)
  }

  const tags = [
    "CDR File ",
    "Sport ",
    "Cricket ",
    "Half Sleeves ",
  ];

  return (
    <div className="productDisplay flex">
      <div className="product-display-left mt-4 ml-8">
        <div className="productDiplay-img h-[500px] w-[500px]">
          <img
            src={`/Products/${product.product_id}.jpeg`}
            className="product-display-main-img rounded-lg"
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right ml-28">
        <h2 className="text-4xl  mt-4">{productId + (product.name ? " | " + product.name : "")}</h2>
        <div className="price flex mt-3 items-center">
          <h1 className="new-price font-bold text-3xl mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
          <h1 className="old-price text-2xl  line-through">₹{(parseFloat(product.price) + 200.00).toFixed(2)}</h1>
          <h3 className="text-xl ml-3"> (-40% off)</h3>
        </div>
        <div className="category flex items-center mt-3 bg-white">
          <h2 className="text-xl">Category: </h2>
          <Breadcrumb className="ml-2">
            <BreadcrumbList>
              {categories.map((el, i) => (
                <div key={i}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">{el["name"]}</BreadcrumbLink>
                    {(categories.length - 1 != i) && (<CgFormatSlash />)}
                  </BreadcrumbItem>
                </div>
              ))}

            </BreadcrumbList >
          </Breadcrumb>
        </div>
        <div className="tags flex flex-wrap gap-2 mt-3">
          <h2 className="text-xl w-full">Tags:</h2>
          {tags.map((badge, index) => (
            <Badge key={index} className="mr-1">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="buy-section mt-5">
          <Button className="mr-3 w-72 bg-black">
            <IoCartOutline />Add to Cart
          </Button>
          <Button className="w-72 mr-3 bg-[#e3c756]">
            <IoCloudDownloadOutline />Download
          </Button>
          <Button onClick={toggleWishlist} className="bg-white text-black  border-black border-[2px]">
            {wishlistCurrent ? (
              <FaHeart className='item-icon' />
            ) : (
              <FaRegHeart className="item-icon" />
            )}
          </Button>
        </div>
      </div>
    </div >
  );
};
