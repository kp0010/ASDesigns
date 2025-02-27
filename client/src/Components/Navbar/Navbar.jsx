import "./Navbar.css";
import "../../App.css";
import logo from "../../Assets/Logos/AS_logo_b.png";

import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { useShop } from "@/Context/ShopContext"

import { NavLink, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const { wishlistData, wishlistLoaded } = useShop();
  const { cartData, cartLoaded } = useShop();
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const writeUserToDB = async () => {
    const token = await getToken();
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // TODO: Error Handling
      });
  };
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowWishlist(false); // Close the wishlist dropdown after navigation
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    const splitLink = event.currentTarget.href.split("/");
    navigate(splitLink[splitLink.length - 1]);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      writeUserToDB();
    }
  }, [isLoaded, getToken]);

  return (
    <nav
      className="navbar sticky-top bg-white navbar-expand-md"
      style={{ "--bs-navbar-padding-y": "0rem" }}
    >
      <div className="d-flex flex-column w-100">
        <div className="container-fluid d-flex align-items-center justify-content-between w-100">
          <NavLink to="/" onClick={handleClick} className="navbar-brand">
            <img
              className="m-3"
              src={logo}
              alt="Bootstrap"
              width={50}
              height={50}
            />
          </NavLink>

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
            <div
              className="relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={(e) => {
                if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                  setShowCart(false);
                }
              }}
            >
              <NavLink to="/cart" onClick={handleClick}>
                <div className="nav-icons d-flex align-items-center">
                  <LuShoppingCart className="icon me-2" />
                  <span>Cart</span>
                  <span className="cart-count nav-indicator">{cartData.length}</span>
                </div>
              </NavLink>
              {showCart && (
                <div
                  className="absolute right-0 w-96 bg-white shadow-lg border rounded-md z-50 max-h-80 overflow-y-auto p-3 hidden sm:block no-scrollbar"
                  onMouseEnter={() => setShowCart(true)}
                  onMouseLeave={() => setShowCart(false)}
                >
                  <span className="ml-2 text-lg font-semibold">Cart</span>
                  {cartLoaded && cartData.length > 0 ? (
                    cartData.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex border-b pb-2 mb-2 last:border-b-0 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        onClick={() => handleProductClick(product.product_id)}
                      >
                        <img
                          src={`/Products/${product.product_id}.jpeg`}
                          className="w-20 h-20 object-cover rounded"
                          alt={product.name}
                        />
                        <div className="ml-3">
                          <h3 className="text-md font-semibold">
                            {product["product_id"] + (product["name"] ? " | " + product["name"] : "")}
                          </h3>
                          <p className="text-md text-gray-500">
                            ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      No items in Cart
                    </p>
                  )}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowWishlist(true)}
              onMouseLeave={(e) => {
                if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                  setShowWishlist(false);
                }
              }}
            >
              <NavLink to="/wishlist" onClick={handleClick}>
                <div className="nav-icons wishlist d-flex align-items-center">
                  <FaRegHeart className="icon me-2" />
                  <span>Wishlist</span>
                  <span className=" wishlist-count nav-indicator">{wishlistData.length}</span>
                </div>
                <div className="hidden wishlist-preview"></div>
              </NavLink>
              {showWishlist && (
                <div
                  className="absolute right-0 w-96 bg-white shadow-lg border rounded-md z-50 max-h-80 overflow-y-auto p-3 hidden sm:block no-scrollbar"
                  onMouseEnter={() => setShowWishlist(true)}
                  onMouseLeave={() => setShowWishlist(false)}
                >
                  <span className="ml-2 text-lg font-semibold">Wishlist</span>
                  {wishlistLoaded && wishlistData.length > 0 ? (
                    wishlistData.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex border-b pb-2 mb-2 last:border-b-0 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        onClick={() => handleProductClick(product.product_id)}
                      >
                        <img
                          src={`/Products/${product.product_id}.jpeg`}
                          className="w-20 h-20 object-cover rounded"
                          alt={product.name}
                        />
                        <div className="ml-3">
                          <h3 className="text-md font-semibold">
                            {product["product_id"] + (product["name"] ? " | " + product["name"] : "")}
                          </h3>
                          <p className="text-md text-gray-500">
                            ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      No items in wishlist
                    </p>
                  )}
                </div>
              )}
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
                    <UserButton
                      appearance={{
                        baseTheme: "dark",
                        elements: {
                          userButtonPopoverActionButton: "hover:bg-red-500",
                        },
                      }}
                    />
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
            <div className="offcanvas-body bg-[#dcdada]">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                    onClick={handleClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/shop"
                    onClick={handleClick}
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/sports"
                    onClick={handleClick}
                  >
                    Sports
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/festival"
                    onClick={handleClick}
                  >
                    Festival
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/others"
                    onClick={handleClick}
                  >
                    Others
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    onClick={handleClick}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navitems for big screen */}
        <div className="container-fluid w-100 d-none d-md-block bg-gray-100">
          <ul className="nav nav-underline">
            <li className="nav-item ps-3">
              <NavLink
                className="nav-link text-dark"
                to="/"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                className="nav-link text-dark"
                to="/shop"
                onClick={handleClick}
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                className="nav-link text-dark"
                to="/sports"
                onClick={handleClick}
              >
                Sports
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                className="nav-link text-dark"
                to="/festival"
                onClick={handleClick}
              >
                Festival
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                className="nav-link text-dark"
                to="/others"
                onClick={handleClick}
              >
                Others
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
