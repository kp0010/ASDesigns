import React from 'react'
import carousel_1 from "../../Assets/hero_main.png";

export const Carousel = () => {
    return (
        <div>
            <div id="carouselExample" className="carousel slide m-4 mt-3">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carousel_1} className="d-block w-100 rounded-4" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel_1} className="d-block w-100 rounded-4" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel_1} className="d-block w-100 rounded-4" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
