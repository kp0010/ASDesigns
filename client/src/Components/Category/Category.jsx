import React from "react";

import "./Category.css";
import "../../App.css";

import sports from "../../Assets/Categories/sport.jpg";
import fest from "../../Assets/Categories/fest.png";
import other from "../../Assets/Categories/other.jpg";

import { NeonGradientCard } from "../magicui/neon-gradient-card";
// import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Button } from "@/Components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Category = () => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    const splitLink = event.currentTarget.href.split("/")
    navigate(splitLink[splitLink.length - 1])
  };

  return (
    <div className="category">
      <div className="text-center">
        <h1 className="text-5xl pt-5 mb-10" style={{ fontFamily: "DM Sans" }}>
          Explore Popular Categories
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-5 lg:gap-20  mb-8">
        <div className="w-80 flex flex-col items-center text-center xl:mb-20 mt-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={sports}
              className="w-full h-48 object-cover filter blur-[2px]"
              alt="Sports"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Sports
              </h5>
              <NavLink to="/sports" onClick={handleClick}>
                <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] hover:bg-black text-black">
                  Explore More <ChevronRight />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col items-center text-center mt-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={fest}
              className="w-full h-48 object-cover filter blur-[2px]"
              alt="Festivals"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Festivals
              </h5>
              <NavLink to="/festival" onClick={handleClick}>
                <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] text-black hover:bg-black hover:text-white">
                  Explore More <ChevronRight />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col items-center text-center mt-2 mb-14">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={other}
              className="w-full h-48 object-cover filter blur-[2px]"
              alt="Others"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Others
              </h5>
              <NavLink to="/others" onClick={handleClick}>
                <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] text-black hover:bg-black hover:text-white">
                  Explore More <ChevronRight />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
