import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

const images = import.meta.glob('../../Assets/Products/*.jpeg');

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";

import { CiHeart } from "react-icons/ci";
import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const ProductDisplay = (props) => {
  const { productId } = props

  const getImage = async (productId) => {
    const module = await images[`../../Assets/Products/${productId}.jpeg`]();
    const imageSrc = module.default
    return imageSrc
  }

  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState("")

  const getProduct = () => {
    fetch(`http://localhost:8080/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json())
      .then(async (data) => {
        setProduct(data["product"])
        setCategories(data["categories"])
        setLoaded(true)
        const imageSrc = await getImage(productId)
        setImageSrc(imageSrc)
      })
  }

  useEffect(() => {
    getProduct()
  }, [])


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
            src={imageSrc}
            className="product-display-main-img rounded-lg"
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right ml-28">
        <h2 className="text-4xl  mt-4">{productId + (product.name ? " | " + product.name : "")}</h2>
        {loaded && (
          <div className="price flex mt-3 items-center">
            <h1 className="new-price font-bold text-3xl mr-4">₹{(parseFloat(product.price) - 1.0).toFixed(2)}</h1>
            <h1 className="old-price text-2xl  line-through">₹{(parseFloat(product.price) + 200.00).toFixed(2)}</h1>
            <h3 className="text-xl ml-3"> (-40% off)</h3>
          </div>
        )}
        <div className="category flex items-center mt-3 bg-white">
          <h2 className="text-xl">Category: </h2>
          <Breadcrumb className="ml-2">
            <BreadcrumbList>

              {loaded && categories.map((el, i) => (
                <>
                  <BreadcrumbItem key={i}>
                    <BreadcrumbLink href="/">{el["name"]}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {(categories.length - 1 != i) && (<CgFormatSlash />)}
                </>
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
          <Button className="bg-white text-black  border-black border-[2px]">
            <CiHeart />
          </Button>
        </div>
      </div>
    </div >
  );
};
