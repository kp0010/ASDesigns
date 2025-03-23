import "./Navbar.css";
import "../../App.css";
import logo from "../../Assets/Logos/AS_logo_b.png";

import { useEffect, useRef, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { useShop } from "@/Context/ShopContext";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

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
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate();

  const { wishlistData, wishlistLoaded } = useShop();
  const { cartData, cartLoaded } = useShop();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ? searchParams.get("q") : "")
  const [searchProducts, setSearchProducts] = useState([]);

  const inputRef = useRef(null)


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
        if (data.success) {
          setIsAdmin(data.user["admin"])
        }
      });
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      writeUserToDB();
    }
  }, [isLoaded, isSignedIn, getToken]);


  const handleItemClick = (product, isCategory = false) => {
    if (isCategory) {
      navigate(`/shop/?cat=${product.name}`);
    } else {
      navigate(`/product/${product.product_id}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowWishlist(false)
    setShowCart(false)
    setShowSearch(false)
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const linkName = event.currentTarget.id

    if (linkName === "home") {
      navigate("/")
    } else if (["shop", "wishlist", "cart", "admin/dashboard"].includes(linkName.toLowerCase())) {
      navigate(`/${linkName}`)
    } else {
      navigate(`/shop/${linkName}`)
    }
  };

  const handleSearchChange = (search) => {
    setSearchQuery(search)

    if (!search.length) {
      setSearchProducts([]);
      return;
    }

    const params = new URLSearchParams({ q: search, minimal: true });

    fetch(`/api/products/?${params.toString()}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setSearchProducts(data.products);
        }
      });
  };

  const handleSearchEnter = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    inputRef.current?.blur()
    setShowSearch(false)
    navigate(`/shop/?q=${searchQuery}`)
  }


  return (
    <nav
      className="navbar sticky-top bg-white navbar-expand-md"
      style={{ "--bs-navbar-padding-y": "0rem" }}
    >
      <div className="d-flex flex-column w-100">
        <div className="container-fluid d-flex align-items-center justify-content-between w-100">
          <NavLink id="home" to="/" onClick={handleClick} className="navbar-brand">
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
                ref={inputRef}
                value={searchQuery}
                className="form-control border-0 bg-light"
                style={{ width: "22rem", height: "2rem" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onFocus={() => { setShowSearch(true); }}
                onBlur={() => { setTimeout(() => setShowSearch(false), 500); }}
                onChange={(e) => { handleSearchChange(e.target.value); }}
                onKeyDown={(e) => {
                  // e.preventDefault()
                  if (e.key === "Enter") { handleSearchEnter(e) }
                }}
              />
              <button
                className="input-group-text bg-light border-0"
                style={{ height: "2rem" }}
              >
                <FaSearch className="text-muted" />
              </button>
            </div>
            {showSearch && searchProducts.length > 0 && (
              <div className="absolute top-16 w-96 bg-white shadow-lg border rounded-md z-50 max-h-80 overflow-y-auto p-3 hidden sm:block no-scrollbar">
                {searchProducts.map((product, idx) => {
                  const isCategory = product.product_id === "category";

                  return (
                    <Link
                      className="bg-red-600"
                      key={idx}
                      to={isCategory ? `/shop/?cat=${product.name}` : `/product/${product.product_id}`}
                    >
                      <div
                        className={`flex border-b pb-2 mb-2 last:border-b-0 cursor-pointer hover:bg-gray-100 p-2 rounded-md
                                    ${isCategory ? "bg-gray-200 text-blue-700 font-semibold text-lg flex-col p-3" : ""}`}
                        onClick={() => { handleItemClick(product, isCategory) }}
                      >

                        {isCategory ? (
                          <div>
                            <h3 className="text-md font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Browse all related products
                            </p>
                          </div>
                        ) : (
                          <>
                            <img
                              src={`/Products/${product.product_id}.jpeg`}
                              className="w-20 h-20 object-cover rounded"
                              alt={product.name}
                            />
                            <div className="ml-3">
                              <h3 className="text-md font-semibold">
                                {product["product_id"] +
                                  (product["name"]
                                    ? " | " + product["name"]
                                    : "")}
                              </h3>
                              <p className="text-md text-gray-500">
                                ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </form>

          <div className="d-flex align-items-center gap-lg-3 gap-1">
            <div
              className="relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={(e) => {
                if (
                  !e.relatedTarget ||
                  !e.currentTarget.contains(e.relatedTarget)
                ) {
                  setShowCart(false);
                }
              }}
            >
              <NavLink id="cart" to="/cart" onClick={handleClick}>
                <div className="nav-icons d-flex align-items-center">
                  <LuShoppingCart className="icon me-2" />
                  <span>Cart</span>
                  {isLoaded && isSignedIn && (
                    <span className="cart-count nav-indicator">
                      {cartData.length}
                    </span>
                  )}
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
                        onClick={() => handleItemClick(product)}
                      >
                        <img
                          src={`/Products/${product.product_id}.jpeg`}
                          className="w-20 h-20 object-cover rounded"
                          alt={product.name}
                        />
                        <div className="ml-3">
                          <h3 className="text-md font-semibold">
                            {product["product_id"] +
                              (product["name"] ? " | " + product["name"] : "")}
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
                if (
                  !e.relatedTarget ||
                  !e.currentTarget.contains(e.relatedTarget)
                ) {
                  setShowWishlist(false);
                }
              }}
            >
              <NavLink id="wishlist" to="/wishlist" onClick={handleClick}>
                <div className="nav-icons wishlist d-flex align-items-center">
                  <FaRegHeart className="icon me-2" />
                  <span>Wishlist</span>
                  {isLoaded && isSignedIn && (
                    <span className=" wishlist-count nav-indicator">
                      {wishlistData.length}
                    </span>
                  )}
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
                        onClick={() => handleItemClick(product)}
                      >
                        <img
                          src={`/Products/${product.product_id}.jpeg`}
                          className="w-20 h-20 object-cover rounded"
                          alt={product.name}
                        />
                        <div className="ml-3">
                          <h3 className="text-md font-semibold">
                            {product["product_id"] +
                              (product["name"] ? " | " + product["name"] : "")}
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
        </div >

        {/* search and sidebar for mobile view */}
        < div className="container-fluid d-flex d-md-none align-items-center mt-2 mb-2" >
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

          <div className="shop-filters-mobile">
            <button
              className="navbar-toggler ms-2 flex-shrink-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
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
                      id="home"
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
                      id="shop"
                      className="nav-link"
                      to="/shop"
                      onClick={handleClick}
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="sports"
                      className="nav-link"
                      to="/shop/sports"
                      onClick={handleClick}
                    >
                      Sports
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="festival"
                      className="nav-link"
                      to="/shop/festival"
                      onClick={handleClick}
                    >
                      Festival
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="others"
                      className="nav-link"
                      to="/shop/others"
                      onClick={handleClick}
                    >
                      Others
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="about"
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
        </div >

        {/* Navitems for big screen */}
        < div className="container-fluid w-100 d-none d-md-block bg-gray-100" >
          <ul className="nav nav-underline">
            <li className="nav-item ps-3">
              <NavLink
                id="home"
                className="nav-link text-dark"
                to="/"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                id="shop"
                className="nav-link text-dark"
                to="/shop/page?/:pageNo?" end
                onClick={handleClick}
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                id="sports"
                className="nav-link text-dark"
                to="/shop/sports"
                onClick={handleClick}
              >
                Sports
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                id="festival"
                className="nav-link text-dark"
                to="/shop/festival"
                onClick={handleClick}
              >
                Festival
              </NavLink>
            </li>
            <li className="nav-item ps-3">
              <NavLink
                id="others"
                className="nav-link text-dark"
                to="/shop/others"
                onClick={handleClick}
              >
                Others
              </NavLink>
            </li>
            {isLoaded && isSignedIn && isAdmin && (
              <li className="nav-item ps-3">
                <NavLink
                  id="admin/dashboard"
                  className="nav-link text-dark"
                  to="/admin/dashboard"
                  onClick={handleClick}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div >
      </div >
    </nav >
  );
};
