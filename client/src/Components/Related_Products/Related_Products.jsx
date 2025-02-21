import React, { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";

import './Related_Products.css';
import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";

import { Item } from "../Item/Item";

export const Related_Products = () => {

  const [relatedProducts, setRelatedProducts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const params = new URLSearchParams({
    "orderBy": "default",
    "limit": 6
  })

  const getFeaturedProducts = () => {
    fetch(`/api/products/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json())
      .then((data) => {
        setRelatedProducts([...data])
        setLoaded(true)
      })
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

  return (
    <div className="prod-list bg-[#edeae7]">
      <h2 className="text-3xl ml-0 pt-3 font-bold mb-8 text-center">
        Similar Products
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="md:w-[80%] sm:w-full md:ml-40 ml-12"
      >
        <CarouselContent>
          {loaded && relatedProducts.map((el, idx) => (
            <CarouselItem
              key={idx}
              className="car-con md:basis-1/2 lg:basis-1/3 xl:basis-1/4 "
            >
              <div className="p-1">
                <div className="item bg-white mb-5 ">
                  {/* TODO: onclick link to product page  */}
                  {/* TODO: need to add props */}
                  <a href={`/`}>
                    <div className="item-image">
                      <img src={`/Products/${el.product_id}.jpeg`} alt="..." />
                      <div className="item-hover-container">
                        {/* TODO: will navigate to add to cart page on clicking the button */}
                        <button className="item-icons-container d-flex rounded-full">
                          <i>
                            <LuShoppingCart className="item-icon" />
                          </i>
                          <span className="item-icon-tag">Add to Cart</span>
                        </button>
                        <button
                          href=""
                          className="item-icons-container d-flex rounded-full"
                        >
                          <i>
                            <PiEyeDuotone className="item-icon" />
                          </i>
                          <span className="item-icon-tag">Quick View</span>
                        </button>
                        <button
                          href=""
                          className="item-icons-container d-flex rounded-full"
                        >
                          <i>
                            <FaRegHeart className="item-icon" />
                          </i>
                          <span className="item-icon-tag">Wishlist</span>
                          {/* TODO: wishlist toggle functionality pending */}
                        </button>
                      </div>
                    </div>
                    <div className="item-content">
                      <h2>{el["product_id"] + (el["name"] ? " | " + el["name"] : "")}</h2>
                    </div>
                    <div className="item-price">
                      <h2>₹{(parseFloat(el["price"]) - 1.0).toFixed(2)}</h2>
                    </div>
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="md:ml-5 lg:ml-5" />
      </Carousel>
    </div>
  );
};
