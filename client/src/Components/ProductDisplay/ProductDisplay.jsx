import React, { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const ProductDisplay = (props) => {
  const { productId, product, categories } = props

  const toggleWishlist = () => {
    // TODO: Add Database query to add to wishlist
    setWishlistCurrent(!wishlistCurrent)
  }

  const [wishlistCurrent, setWishlistCurrent] = useState(false)

  const tags = [
    "CDR File ",
    "Sport ",
    "Cricket ",
    "Half Sleeves ",
  ];

  return (
    <>
      <div className="hidden md:flex md:flex-col lg:flex-row xl:flex-row productDisplay">
        <div className="product-display-left mt-4 ml-8 ">
          <div className="productDiplay-img h-[500px] w-[500px] md:ml-52 lg:ml-0 xl:ml-0">
            <img
              src={`/Products/${productId}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>

        <div className="product-display-right ml-28">
          <h2 className="text-4xl mt-4">{productId + (product["name"] ? " | " + product["name"] : "")}</h2>

          <div className="price flex mt-3 items-center">
            <h1 className="new-price font-bold text-3xl mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
            <h1 className="old-price text-2xl line-through">₹{(parseFloat(product.price) + 200.0).toFixed(2)}</h1>
            <h3 className="text-xl ml-3">(-40% off)</h3>
          </div>

          <div className="category flex items-center mt-3 bg-white">
            <h2 className="text-xl">Category:</h2>
            <Breadcrumb className="ml-2">
              <BreadcrumbList>
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        {category["name"]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < categories.length - 1 && (
                      <BreadcrumbSeparator>
                        <CgFormatSlash />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="tags flex flex-wrap gap-2 mt-3">
            <h2 className="text-xl w-full">Tags:</h2>
            {tags.map((tag, index) => (
              <Badge key={index} className="mr-1">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="buy-section mt-5">
            <Button className="mr-3 w-72 md:mb-3 bg-black">
              <IoCartOutline /> Add to Cart
            </Button>
            <Button className="w-72 mr-3 md:mb-3 bg-[#e3c756]">
              <IoCloudDownloadOutline /> Download
            </Button>
            <Button className="bg-white text-black border-black border-2 md:mb-3">
              <CiHeart />
            </Button>
          </div>
        </div>
      </div>

      {/* Small Screens (<md) Layout */}
      <div className="md:hidden productDisplay flex flex-col items-center p-4">
        {/* Product Image */}
        <div className="w-full flex justify-center">
          <div className="productDiplay-img h-[350px] w-[350px]">
            <img
              src={`/Products/${productId}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full text-center mt-6">
          <h2 className="text-3xl mt-4 mr-5 ">{productId + (product["name"] ? " | " + product["name"] : "")}</h2>

          {/* Price */}
          <div className="price flex justify-center mt-3 items-center">
            <h1 className="new-price font-bold text-2xl mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
            <h1 className="old-price text-xl line-through">₹{(parseFloat(product.price) + 200.0).toFixed(2)}</h1>
            <h3 className="text-lg ml-3">(-40% off)</h3>
          </div>

          {/* Categories */}
          <div className="category flex flex-col items-center mt-3 bg-white">
            <h2 className="text-xl">Category:</h2>
            <Breadcrumb className="ml-2">
              <BreadcrumbList className="flex flex-wrap justify-center">
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink >
                        {category["name"]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < categories.length - 1 && (
                      <BreadcrumbSeparator>
                        <CgFormatSlash />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Tags */}
          <div className="tags flex flex-wrap justify-center gap-2 mt-3">
            <h2 className="text-xl w-full text-center">Tags:</h2>
            {tags.map((tag, index) => (
              <Badge key={index} className="mr-1">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Buttons */}
          <div className="buy-section flex flex-col items-center mt-5 space-y-3">
            <Button className="w-full bg-black flex items-center justify-center">
              <IoCartOutline className="mr-2" />
              Add to Cart
            </Button>
            <Button className="w-full bg-[#e3c756] flex items-center justify-center">
              <IoCloudDownloadOutline className="mr-2" />
              Download
            </Button>
            <Button onClick={toggleWishlist} className="w-full bg-white text-black border-black border-2 flex items-center justify-center">
              <CiHeart className="mr-2" />
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
