import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import { Badge } from "../ui/badge";

import { CgFormatSlash } from "react-icons/cg";

import AddToCart from "../ui/addToCartBtn";
import Download from "../ui/downloadBtn";
import { Link } from "react-router-dom";

const ProductModal = ({ product, triggerButton }) => {
  const [categories, setCategories] = useState([]);

  const getProduct = () => {
    fetch(`/api/products/${product.product_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data["categories"]);
      });
  };

  useEffect(() => {
    getProduct();
  }, [product.product_id]);

  const tags = ["CDR File ", "Sport ", "Cricket ", "Half Sleeves "];

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-w-2xl md:max-w-4xl lg:max-w-5xl w-full mt-10">
        <DialogHeader>
          <DialogTitle className="text-xl">Product Details</DialogTitle>
        </DialogHeader>
        <div className="prod-details flex gap-6 items-center">
          <img
            src={`/Products/${product.product_id}.jpeg`}
            alt={product.name}
            className="w-[400px] h-[400px] object-cover rounded-lg"
          />
          <div className="prod-info">
            <h2 className="text-3xl ml-10 font-bold">{product.name}</h2>
            <div className="price flex mt-3 ml-10">
              <h1 className="new-price font-bold text-3xl mr-4">
                ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
              </h1>
              <h1 className="old-price text-2xl line-through">
                ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
              </h1>
              <h3 className="text-xl ml-3">(-40% off)</h3>
            </div>
            <div className="category flex items-center mt-3 bg-white ml-10">
              <h2 className="text-xl">Category:</h2>
              <Breadcrumb className="ml-2">
                <BreadcrumbList>
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to={`/shop/?cat=${category['name']}`}> {category["name"]}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {
                        index < categories.length - 1 && (
                          <BreadcrumbSeparator>
                            <CgFormatSlash />
                          </BreadcrumbSeparator>
                        )
                      }
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="tags flex flex-wrap gap-2 mt-3 ml-10">
              <h2 className="text-xl w-full">Tags:</h2>
              {tags.map((tag, index) => (
                <Badge key={index} className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="buy-section">
              <AddToCart className="w-60 md:mb-3 ml-10 mt-5" product={product} />
              <Download className="w-60 md:mb-3 bg-[#e3c756] ml-10 mt-5" productId={product.product_id} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default ProductModal;
