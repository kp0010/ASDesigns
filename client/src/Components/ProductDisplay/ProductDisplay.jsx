import React, { useEffect, useRef, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { toast } from "sonner";

import anim from "./anim.json";
import Lottie from "lottie-react";

import { CgFormatSlash } from "react-icons/cg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import styled from "styled-components";

import { useShop } from "@/Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import AddToCart from "../ui/addToCartBtn";
import Download from "../ui/downloadBtn";
import './ProductDisplay.css'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 500px;
  height: 500px;
  border-radius: 15px;
  cursor: crosshair;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 400px;
    height: 400px;
  }
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
  // Animation Data
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

  // Animation Data End
  // --------------------------------------
  // Cart and Wishlist Data and Setup

  const {
    wishlistData,
    deleteFromWishlist,
    addToWishlist,
    refreshWishlist,
  } = useShop();

  const useStableState = value => {
    const [stableValue, setStableValue] = useState(value);
    const ref = useRef(value);

    useEffect(() => {
      if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
        ref.current = value;
        setStableValue(value)
      }
    }, [value]);

    return stableValue;
  }

  const stableWishlistData = useStableState(wishlistData)

  const [wishlistCurrent, setWishlistCurrent] = useState(false);

  const toggleWishlist = async () => {
    setWishlistCurrent(!wishlistCurrent);

    [lottieRefLarge, lottieRefSmall].forEach(ref => {
      if (!wishlistCurrent) {
        toast.success("Added to Wishlist");
        ref.current.goToAndPlay(0, true);
        setTimeout(() => {
          lottieRefLarge.current.goToAndStop(30, true);
        }, 800);
      } else {
        toast.info("Removed from Wishlist");
        ref.current.goToAndPlay(50, true);
      }
    })

    if (wishlistCurrent) {
      setWishlistCurrent(false);
      await deleteFromWishlist(product.product_id);
    } else {
      setWishlistCurrent(true);
      await addToWishlist(product.product_id);
    }
    refreshWishlist();
  };


  useEffect(() => {
    const foundWSProduct = stableWishlistData.find((prod) => prod.product_id === productId);

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
  }, [productId])

  const tags = ["CDR File ", "Sport ", "Cricket ", "Half Sleeves "];

  return (
    <>
      <div className="hidden md:flex md:flex-col lg:flex-row xl:flex-row productDisplay xl:ml-16">
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

        <div className="product-display-right xl:ml-28 lg:ml-16 md:ml-8 product-text-center">
          <h2 className="text-4xl mt-4">
            {productId + (product["name"] ? " | " + product["name"] : "")}
          </h2>

          <div className="price flex mt-3">
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
                      <BreadcrumbLink asChild>
                        <Link to={`/shop/?cat=${category["name"]}`}> {category["name"]}</Link>
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

          <div className="buy-section mt-5 flex wishlist-wrap">
            <div className="buy-btns">
              <AddToCart className="mr-3 w-72 md:mb-3" product={product} />
              <Download className="w-72 mr-3 md:mb-3 bg-[#e3c756]" productId={product.product_id} />
            </div>
            <Button
              onClick={toggleWishlist}
              className="bg-white text-black border-black border-2 md:mb-3 pt-0"
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
      <div className="md:hidden productDisplay flex flex-col items-center p-4">
        <div className="w-full flex justify-center">
          <div className="productDiplay-img s:h-[350px] w-[350px]">
            <img
              src={`/Products/${productId}.jpeg`}
              className="product-display-main-img rounded-lg"
              alt=""
            />
          </div>
        </div >

        {/* Product Details */}
        <div className="w-full text-center mt-6">
          <h2 className="text-3xl mr-5 ">
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
                    <BreadcrumbLink asChild>
                      <Link to={`/shop/?cat=${category['name']}`}> {category["name"]}</Link>
                    </BreadcrumbLink>
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
            <AddToCart className="w-full bg-black flex items-center justify-center" product={product} />
            <Download className="w-full bg-[#e3c756] flex items-center justify-center" productId={product.product_id} />

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
        </div>
      </div>
    </>
  );
};
