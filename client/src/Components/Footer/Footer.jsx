import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        className="text-white text-center text-lg-start xl:pl-16  md:px-10"
        style={{ backgroundColor: "#23242a" }}
      >
        <div className="container p-4">
          <div className="row mt-4 d-flex flex-wrap justify-content-between gap-4">
            <div className="col-lg-4 col-md-12 mb-4">
              <h5 className="text-uppercase mb-4 font-bold">About company</h5>
              <p className="text-justify">
                ASDesigns is a creative platform dedicated to delivering custom
                jersey designs to customers worldwide. We make it easy to
                browse, purchase, and receive your personalized designs with a
                smooth and secure experience.
              </p>
              <div className="mt-4 d-flex gap-3 justify-evenly">
                <a className="btn btn-warning btn-lg">
                  <CiFacebook />
                </a>
                <a className="btn btn-warning btn-lg">
                  <CiTwitter />
                </a>
                <a className="btn btn-warning btn-lg">
                  <FaGooglePlusG />
                </a>
              </div>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2">
              <h6 className="text-uppercase mb-4 font-bold">Quick Links</h6>
              <div className="d-flex flex-column gap-2">
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <Link to="/" onClick={handleClick}>
                    Home
                  </Link>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <Link to="/shop" onClick={handleClick}>
                    Shop
                  </Link>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <Link to="/shop/sports" onClick={handleClick}>
                    Sports
                  </Link>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <Link to="/shop/festival" onClick={handleClick}>
                    Festival
                  </Link>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <Link to="/shop/others" onClick={handleClick}>
                    Others
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="mb-3 font-bold"> Contact Us:</h5>
              <ul className="fa-ul ms-3">
                <li className="mb-3 d-flex align-items-center">
                  <span className="fa-li">
                    <FaHome />
                  </span>
                  <span className="ms-2">Chembur, Mumbai - 400071</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="fa-li">
                    <FaEnvelope />
                  </span>
                  <span className="ms-2">asdesigns@outlook.com</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="fa-li">
                    <IoIosCall />
                  </span>
                  <span className="ms-2">+91 99282 88280</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            {" "}
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </>
  );
};
