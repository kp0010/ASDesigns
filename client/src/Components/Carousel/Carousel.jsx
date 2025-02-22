import React from "react";
import carousel_1 from "../../Assets/Carousel/carousel_1.png"

export const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide sm:m-0 sm:mt-0 md:mt-3 md:m-4 lg:mt-3 lg:m-4 xl:mt-3 xl:m-4 custom-carousel"
        data-bs-ride="carousel"
        data-bs-pause="hover"
      >
        <div className="carousel-inner" data-bs-interval="3000">
          <div className="carousel-item active">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 sm:rounded-none md:rounded-4 lg:rounded-4 xl:rounded-4 img-fit"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 sm:rounded-none md:rounded-4 lg:rounded-4 xl:rounded-4 img-fit"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 sm:rounded-none md:rounded-4 lg:rounded-4 xl:rounded-4 img-fit"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
