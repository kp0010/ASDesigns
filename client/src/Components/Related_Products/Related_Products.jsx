import * as React from "react";
import prod_img from "../../../public/Products/JD001.jpeg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import './Related_Products.css';
import { LuShoppingCart } from "react-icons/lu";
import { PiEyeDuotone } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";

export const Related_Products = () => {
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
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="car-con md:basis-1/2 lg:basis-1/3 xl:basis-1/4 "
            >
              <div className="p-1">
                <div className="item bg-white mb-5 ">
                  {/* TODO: onclick link to product page  */}
                  {/* TODO: need to add props */}
                  <a href={`/`}>
                    <div className="item-image">
                      <img src={prod_img} alt="..." />
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
                      <h2>Shoes</h2>
                    </div>
                    <div className="item-price">
                      <h2>₹ 200</h2>
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
