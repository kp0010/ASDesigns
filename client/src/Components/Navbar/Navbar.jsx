import "./Navbar.css";
import logo from "../../Assets/ASDesigns_Logo.png";



import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar navbar-expand-md ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            className="mt-3"
            src={logo}
            alt="Bootstrap"
            width={200}
            height={50}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex mx-auto">
            <div className="input-group">
              <input
                className="form-control border-0 bg-light"
                style={{ width: "18rem", margin: "0 0 0 11rem" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <span className="input-group-text bg-light border-0">
                <FaSearch className="text-muted" />
              </span>
            </div>
          </form>
        </div>
        <div className="nav-icons">
          <LuShoppingCart className="icon" />
          Cart
        </div>
        <div className="nav-icons">
          <FaRegHeart className=" icon" />
          Wishlist
        </div>
        {user ? <h1>user icon present</h1> : <h1>user icon absent</h1>}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
