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
import { FaHeart } from "react-icons/fa6";

import { Link } from "react-router-dom";

export const Related_Products = () => {

  const [relatedProducts, setRelatedProducts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [wishlistCurrent, setWishlistCurrent] = useState(false)

  const params = new URLSearchParams({
    "orderBy": "default",
    "limit": 8
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
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 10);
    getFeaturedProducts()
  }, [loaded])

  return (
    <div className="prod-list bg-[#edeae7]">
      <h2 className="text-5xl ml-0 pt-4 mb-8 text-center">
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

                  <div className="item-image">
                    <Link to={`/product/${el.product_id}`} onClick={() => { setLoaded(false) }}>
                      <img src={`/Products/${el.product_id}.jpeg`} alt="..." />
                    </Link>
                    <div className="item-hover-container">
                      <Link to="/cart">
                        <button className="item-icons-container d-flex rounded-full">
                          <i>
                            <LuShoppingCart className="item-icon" />
                          </i>
                          <span className="item-icon-tag">Add to Cart</span>
                        </button>
                      </Link>

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
                        onClick={() => { setWishlistCurrent(!wishlistCurrent) }}
                        className="item-icons-container d-flex rounded-full"
                      >
                        <i>
                          {wishlistCurrent ? (
                            <FaHeart className='item-icon' />
                          ) : (
                            <FaRegHeart className="item-icon" />
                          )}
                        </i>
                        <span className="item-icon-tag">Wishlist</span>
                        {/* TODO: wishlist count functionality pending */}
                      </button>
                    </div>
                  </div>

                  <Link to={`/product/${el.product_id}`} onClick={() => { setLoaded(false) }}>
                    <div className="item-content">
                      <h2>{el["product_id"] + (el["name"] ? " | " + el["name"] : "")}</h2>
                    </div>
                    <div className="item-price">
                      <h2>₹{(parseFloat(el["price"]) - 1.0).toFixed(2)}</h2>
                    </div>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="md:ml-5 lg:ml-5" />
      </Carousel>
    </div >
  );
};
