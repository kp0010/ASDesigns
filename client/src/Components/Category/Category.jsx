import React from "react";
import "./Category.css";
import "../../App.css";

import sports from "../../Assets/Categories/sport.jpg";
import fest from "../../Assets/Categories/fest.png";
import other from "../../Assets/Categories/other.jpg";

import { NavLink, useNavigate } from "react-router-dom";

export const Category = () => {
  const categories = [
    {
      title: "Sports",
      subtitle: "Explore Your Favorite Games",
      img: sports,
      link: "/shop/sports",
    },
    {
      title: "Festivals",
      subtitle: "Celebrate With Joy",
      img: fest,
      link: "/shop/festival",
    },
    {
      title: "Others",
      subtitle: "Find Something Unique",
      img: other,
      link: "/shop/others",
    },
  ];


  return (
    <div className="bg-[#edeae7] py-12">
      {/* Heading */}
      <h2 className="text-4xl text-center text-gray-800 mb-12">
        Shop by Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <NavLink to={category.link}>
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={category.img}
              className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-300 group-hover:scale-110"
              alt={category.title}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            {/* Text & Button */}
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-lg font-semibold">{category.subtitle}</p>
              <h2 className="text-3xl font-bold pb-1">{category.title}</h2>
                <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium transition hover:bg-gray-200">
                  Shop now
                </button>              
            </div>
          </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
