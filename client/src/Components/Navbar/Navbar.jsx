import "./Navbar.css";
import "../../App.css";
import logo from "../../Assets/ASDesigns_Logo.png";

import { useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { useUser, useAuth } from "@clerk/clerk-react";

import { Skeleton } from "./Skeleton";

export const Navbar = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const writeUserToDB = async () => {
    const token = await getToken();
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Error Handling
      });
  };

  useEffect(() => {
    if (isSignedIn) {
      writeUserToDB();
    }
  }, [isLoaded, getToken]);

  return (
    <nav
      className="navbar navbar-expand-md"
      style={{ "--bs-navbar-padding-y": "0rem" }}
    >
      <div className="d-flex flex-column w-100">
        <div className="container-fluid d-flex align-items-center justify-content-between w-100">
          <a className="navbar-brand" href="#">
            <img
              className="m-3"
              src={logo}
              alt="Bootstrap"
              width={130}
              height={20}
            />
          </a>

          <form className="d-none d-md-flex mx-auto ">
            <div className="input-group">
              <input
                className="form-control border-0 bg-light"
                style={{ width: "18rem", height: "2rem" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="input-group-text bg-light border-0"
                style={{ height: "2rem" }}
              >
                <FaSearch className="text-muted" />
              </button>
            </div>
          </form>
          <div className="d-flex align-items-center gap-lg-3 gap-1">
            <div className="nav-icons d-flex align-items-center">
              <LuShoppingCart className="icon me-2" />
              <span>Cart</span>
            </div>

            <div className="nav-icons d-flex align-items-center">
              <FaRegHeart className="icon me-2" />
              <span>Wishlist</span>
            </div>

            <div className="nav-login-icon">
              {!user && !isLoaded ? (
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
              ) : null}

              <>
                <SignedOut>
                  <div className="sign-out d-flex flex-md-row flex-column p-2 mt-2 border-md">
                    <FaRegUserCircle className="me-2" />
                    <SignInButton className="mt-md-0 mt-1 me-lg-2" />
                  </div>
                </SignedOut>
                <div className="sign-in ml-2 mr-2 mt-1">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>

              </>
            </div>
          </div>
        </div>

        {/* search and sidebar for mobile view */}
        <div className="container-fluid d-flex d-md-none align-items-center mt-2 mb-2">
          <form className="d-flex flex-grow-1">
            <div className="input-group w-100">
              <input
                className="form-control border-0 bg-light"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <span className="input-group-text bg-light border-0">
                <FaSearch className="text-muted" />
              </span>
            </div>
          </form>
          <button
            className="navbar-toggler ms-2 flex-shrink-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            style={{ width: "20%" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end w-50"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Welcome{isLoaded && isSignedIn ? ", " + user.firstName : null}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#shop">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#sports">
                    Sports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#festivl">
                    Festival
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#others">
                    Others
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navitems for big screen */}
        <div className="container-fluid w-100 d-none d-md-block bg-light">
          <ul className="nav nav-underline">
            <li className="nav-item ps-3">
              <a className="nav-link text-dark" href="#">
                Home
              </a>
            </li>
            <li className="nav-item ps-3">
              <a className="nav-link text-dark" href="#shop">
                Shop
              </a>
            </li>
            <li className="nav-item ps-3">
              <a className="nav-link text-dark" href="#sports">
                Sports
              </a>
            </li>
            <li className="nav-item ps-3">
              <a className="nav-link text-dark" href="#festival">
                Festival
              </a>
            </li>
            <li className="nav-item ps-3">
              <a className="nav-link text-dark" href="#others">
                Others
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
