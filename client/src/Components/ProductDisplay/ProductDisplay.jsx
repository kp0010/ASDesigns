import React, { useEffect, useRef, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Toaster, toast } from "sonner";

import anim from "./anim.json";
import Lottie from "lottie-react";

import { IoCartOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import styled from "styled-components";
import { useShop } from "@/Context/ShopContext";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 500px;
  height: 500px;
  border-radius: 15px;
  cursor: crosshair;
`;

const Image = styled.img.attrs((props) => ({
  src: props.source,
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Target = styled.div`
  position: absolute;
  width: 400px; /* Size of the magnified area */
  height: 400px;
  background: url(${(props) => props.source}) no-repeat;
  background-size: 1000px; /* Zoom Level (Increase for more zoom) */
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  border: 2px solid #fff;
  border-radius: 50%;
  pointer-events: none;
  display: ${(props) => (props.opacity ? "block" : "none")};
`;

export const ProductDisplay = ({ productId, product, categories }) => {
  const sourceRef = useRef(null);
  const containerRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e) => {
    const imgRect = sourceRef.current.getBoundingClientRect();
    const x = e.pageX - imgRect.left;
    const y = e.pageY - imgRect.top;

    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      setOpacity(0);
      return;
    }

    setOffset({ left: x - 100, top: y - 100 });

    setBgPos({
      x: (-x / imgRect.width) * imgRect.width * 2,
      y: (-y / imgRect.height) * imgRect.height * 2,
    });

    setOpacity(1);
  };

  const lottieRefLarge = useRef(null);
  const lottieRefSmall = useRef(null);

  const {
    wishlistData,
    wishlistLoaded,
    deleteFromWishlist,
    addToWishlist,
    refreshWishlist,
  } = useShop();

  const {
    cartData,
    cartLoaded,
    deleteFromCart,
    addToCart,
    refreshCart
  } = useShop()

  const [wishlistCurrent, setWishlistCurrent] = useState(false);
  const [cartCurrent, setCartCurrent] = useState(false)

  const toggleWishlist = () => {
    setWishlistCurrent(!wishlistCurrent);

    if (lottieRefLarge.current) {
      if (!wishlistCurrent) {
        toast.success("Added to Wishlist");
        lottieRefLarge.current.goToAndPlay(0, true);
        setTimeout(() => {
          lottieRefLarge.current.goToAndStop(30, true);
        }, 800);
      } else {
        toast.info("Removed from Wishlist");
        lottieRefLarge.current.goToAndPlay(50, true);
      }
    }

    if (lottieRefSmall.current) {
      if (!wishlistCurrent) {
        lottieRefSmall.current.goToAndPlay(0, true);
        setTimeout(() => {
          lottieRefSmall.current.goToAndStop(30, true);
        }, 800);
      } else {
        lottieRefSmall.current.goToAndPlay(50, true);
      }
    }

    if (wishlistCurrent) {
      setWishlistCurrent(false);
      deleteFromWishlist(product.product_id);
    } else {
      setWishlistCurrent(true);
      addToWishlist(product.product_id);
    }
    refreshWishlist();
  };

  const toggleCart = () => {
    if (cartCurrent) {
      setCartCurrent(false);
      deleteFromCart(product.product_id);
      toast.info("Removed from Cart")
    } else {
      setCartCurrent(true);
      addToCart(product.product_id, product.price);
      toast.success("Added to Cart")
    }
    refreshCart();
  }

  useEffect(() => {
    // Reset wishlist state based on the new product

    const foundCartProduct = cartData.find(
      (prod) => prod.product_id === productId
    )
    setCartCurrent(foundCartProduct !== undefined)

    const foundWSProduct = wishlistData.find(
      (prod) => prod.product_id === productId
    );
    setWishlistCurrent(foundWSProduct !== undefined);

    // Reset Lottie animation when switching products
    if (lottieRefLarge.current) {
      lottieRefLarge.current.goToAndStop(0, true); // Reset to the first frame
    }

    // If the product is in the wishlist, play animation and stop at frame 30
    if (foundWSProduct && lottieRefLarge.current) {
      lottieRefLarge.current.goToAndPlay(0, true);
      setTimeout(() => {
        lottieRefLarge.current.goToAndStop(30, true);
      }, 800);
    }

    if (lottieRefSmall.current) {
      lottieRefSmall.current.goToAndStop(0, true);
    }

    if (foundWSProduct && lottieRefSmall.current) {
      lottieRefSmall.current.goToAndPlay(0, true);
      setTimeout(() => {
        lottieRefSmall.current.goToAndStop(30, true);
      }, 800);
    }
  }, [productId]);

  const tags = ["CDR File ", "Sport ", "Cricket ", "Half Sleeves "];

  return (
    <>
      <div className="hidden md:flex md:flex-col lg:flex-row xl:flex-row productDisplay ml-16">
        <div className="product-display-left mt-4 ml-8 mb-5">
          {/* <div className="productDiplay-img h-[500px] w-[500px] md:ml-52 lg:ml-0 xl:ml-0">
            <img
              src={`/Products/${productId}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div> */}
          <Container
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Image
              ref={sourceRef}
              source={`/Products/${productId}.jpeg`}
              alt="Product"
            />
            <Target
              opacity={opacity}
              offset={offset}
              source={`/Products/${productId}.jpeg`}
              style={{ backgroundPosition: `${bgPos.x}px ${bgPos.y}px` }}
            />
          </Container>
        </div>

        <div className="product-display-right ml-28">
          <h2 className="text-4xl mt-4">
            {productId + (product["name"] ? " | " + product["name"] : "")}
          </h2>

          <div className="price flex mt-3 items-center">
            <h1 className="new-price font-bold text-3xl mr-4">
              ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
            </h1>
            <h1 className="old-price text-2xl line-through">
              ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
            </h1>
            <h3 className="text-xl ml-3">(-40% off)</h3>
          </div>

          <div className="category flex items-center mt-3 bg-white">
            <h2 className="text-xl">Category:</h2>
            <Breadcrumb className="ml-2">
              <BreadcrumbList>
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {/* need to add right path */}
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

          <div className="buy-section mt-5 flex">
            <div className="buy-btns">
              <Button onClick={toggleCart} className={`mr-3 w-72 md:mb-3 ${cartCurrent ? "bg-black" : "bg-[#e3c756]"}`}>
                < IoCartOutline /> Add to Cart
              </Button>
              <Button className="w-72 mr-3 md:mb-3 bg-[#e3c756]">
                <IoCloudDownloadOutline /> Download
              </Button>
            </div>
            <Toaster
              theme="dark"
            />
            <Button
              onClick={toggleWishlist}
              className="bg-white text-black border-black border-2 md:mb-3 pt-0 "
            >
              {wishlistCurrent ? (
                <Lottie
                  animationData={anim}
                  lottieRef={lottieRefLarge}
                  autoplay={false}
                  loop={false}
                  style={{ transform: "scale(4)" }}
                  className="w-10 mt-2"
                />
              ) : (
                <Lottie
                  animationData={anim}
                  lottieRef={lottieRefLarge}
                  autoplay={false}
                  loop={false}
                  style={{ transform: "scale(4)" }}
                  className="w-10 mt-2"
                />
              )}
            </Button>
          </div>
        </div>
      </div >

      {/* Small Screens (<md) Layout */}
      < div className="md:hidden productDisplay flex flex-col items-center p-4" >
        {/* Product Image */}
        < div className="w-full flex justify-center" >
          <div className="productDiplay-img h-[350px] w-[350px]">
            <img
              src={`/Products/${productId}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div >

        {/* Product Details */}
        < div className="w-full text-center mt-6" >
          <h2 className="text-3xl mt-4 mr-5 ">
            {productId + (product["name"] ? " | " + product["name"] : "")}
          </h2>

          {/* Price */}
          <div className="price flex justify-center mt-3 items-center">
            <h1 className="new-price font-bold text-2xl mr-4">
              ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
            </h1>
            <h1 className="old-price text-xl line-through">
              ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
            </h1>
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
                      {/* TODO: need to add right path */}
                      <BreadcrumbLink>{category["name"]}</BreadcrumbLink>
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
            <Button
              onClick={toggleWishlist}
              className="w-full bg-white text-black border-black border-2 flex items-center justify-center px-[100px]"
            >
              {wishlistCurrent ? (
                <Lottie
                  animationData={anim}
                  lottieRef={lottieRefSmall}
                  autoplay={false}
                  loop={false}
                  style={{ transform: "scale(4)" }}
                  className="w-10 "
                />
              ) : (
                <Lottie
                  animationData={anim}
                  lottieRef={lottieRefSmall}
                  autoplay={false}
                  loop={false}
                  style={{ transform: "scale(4)" }}
                  className="w-10 "
                />
              )}
              Wishlist
            </Button>
          </div>
        </div >
      </div >
    </>
  );
};
