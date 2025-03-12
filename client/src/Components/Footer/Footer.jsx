import React from "react";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export const Footer = () => {
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
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti.
              </p>
              <p className="text-justify">
                Blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias.
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
                  <a className="text-white">Home</a>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <a className="text-white">Shop</a>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <FaArrowRightFromBracket />
                  <a className="text-white">Contact Us</a>
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
                  <span className="ms-2">+01 234 567 89</span>
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
