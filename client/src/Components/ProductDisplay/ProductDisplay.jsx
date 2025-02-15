import product_img from "../../Assets/Products/JD001.jpeg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";

import { CiHeart } from "react-icons/ci";
import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const ProductDisplay = () => {
  // To Calculate Discounted Rate

  //   const oldPrice = 599;
  //   const newPrice = 299;
  //   const discountPercentage = Math.round(
  //     ((oldPrice - newPrice) / oldPrice) * 100
  //   );

  //   <div className="price flex mt-3 items-center">
  //     <h1 className="new-price font-bold text-3xl mr-4">${newPrice}</h1>
  //     <h1 className="old-price text-2xl line-through">${oldPrice}</h1>
  //     <h3 className="text-xl ml-3">(-{discountPercentage}% off)</h3>
  //   </div>;
  const badges = [
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge",
    "Badge",
    "Badge ",
    "Badge ",
    "Badge",
    "Badge",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge ",
    "Badge",
    "Badge",
    "Badge ",
    "Badge ",
    "Badge",
    "Badge",
  ];

  return (
    <div className="productDisplay flex">
      <div className="product-display-left mt-4 ml-8">
        <div className="productDiplay-img h-[500px] w-[500px]">
          <img
            src={product_img}
            className="product-display-main-img rounded-lg"
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right ml-28">
        <h2 className="text-4xl  mt-4">Shoes Reebok Zig Kinetica K2</h2>
        <div className="price flex mt-3 items-center">
          <h1 className="new-price font-bold text-3xl mr-4">$299</h1>
          <h1 className="old-price text-2xl  line-through">$599</h1>
          <h3 className="text-xl ml-3"> (-40% off)</h3>
        </div>
        <div className="category flex items-center mt-3 bg-white">
          <h2 className="text-xl">Category: </h2>
          <Breadcrumb className="ml-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Sports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <CgFormatSlash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Cricket</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <CgFormatSlash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Kabaddi</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="tags flex flex-wrap gap-2 mt-3">
          <h2 className="text-xl w-full">Tags:</h2>
          {badges.map((badge, index) => (
            <Badge key={index} className="mr-1">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="buy-section mt-5">
          <Button className="mr-3 w-72 bg-black">
            <IoCartOutline/>Add to Cart
          </Button>
          <Button className="w-72 mr-3 bg-[#e3c756]">
            <IoCloudDownloadOutline/>Download
          </Button>
          <Button className="bg-white text-black  border-black border-[2px]">
            <CiHeart/>
          </Button>
        </div>
      </div>
    </div>
  );
};
