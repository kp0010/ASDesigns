import React from "react";
import carousel_1 from "../../Assets/1.png";
import carousel_2 from "../../Assets/test.png";

export const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide m-4 mt-3 custom-carousel"
        data-bs-ride="carousel"
        data-bs-pause="hover"
      >
        <div className="carousel-inner" data-bs-interval="3000">
          <div className="carousel-item active">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 rounded-4 img-fit"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 rounded-4 img-fit"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel_1}
              className="d-block w-100 h-100 rounded-4 img-fit"
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
