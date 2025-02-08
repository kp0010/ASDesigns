import React from "react";
import "./Category.css";
import "../../App.css";
import sports from "../../Assets/sport.jpg";
import fest from "../../Assets/fest.jpg";
import other from "../../Assets/other.jpg";
import { NeonGradientCard } from "../magicui/neon-gradient-card";
// import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const Category = () => {
  return (
    <div className="category">
      <div className="text-center">
        <h1 className="text-5xl pt-5 mb-10" style={{ fontFamily: "DM Sans" }}>
          Explore Popular Categories
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-5 lg:gap-20 mb-8">
        <div className="w-80 flex flex-col items-center text-center lg:mb-20 mt-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={sports}
              className="w-full h-48 object-cover filter blur-[1px]"
              alt="Sports"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Sports
              </h5>
              <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] text-black hover:bg-black hover:text-white">
                Explore More <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col items-center text-center mt-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={fest}
              className="w-full h-48 object-cover filter blur-[1px]"
              alt="Festivals"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Festivals
              </h5>
              <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] text-black hover:bg-black hover:text-white">
                Explore More <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col items-center text-center mt-2">
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={other}
              className="w-full h-48 object-cover filter blur-[0px]"
              alt="Others"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h5 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg min-h-[50px] flex items-center">
                Others
              </h5>
              <Button className="explore-btn rounded-full mt-3 px-6 py-2 flex items-center gap-2 bg-[#f2f0ea] text-black hover:bg-black hover:text-white">
                Explore More <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
