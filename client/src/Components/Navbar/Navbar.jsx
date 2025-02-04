import "./Navbar.css";
import logo from "../../Assets/ASDesigns_Logo.png";
import '../../App.css'

import { useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser, useAuth } from "@clerk/clerk-react";

import { Skeleton } from "./skeleton";

export const Navbar = () => {
    const { user } = useUser()
    const { isLoaded, isSignedIn, getToken } = useAuth()

    const writeUserToDB = async () => {
        const token = await getToken()
        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                Print
            })
    }

    useEffect(() => {
        if (isSignedIn) {
            writeUserToDB()
        }
    }, [isLoaded, getToken])

    return (
        <nav className="navbar navbar-expand-md">
            <div className="d-flex flex-column w-100">
                <div className="container-fluid d-flex w-100">
                    <a className="navbar-brand" href="#">
                        <img
                            className="m-3"
                            src={logo}
                            alt="Bootstrap"
                            width={150}
                            height={30}
                        />
                    </a>
                    {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}

                    <form className="d-none d-md-flex mx-auto">
                        <div className="input-group mt-10">
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
                    <div className="nav-icons">
                        <LuShoppingCart className="icon" />
                        Cart
                    </div>
                    <div className="nav-icons">
                        <FaRegHeart className="icon" />
                        Wishlist
                    </div>
                    <div className="nav-login-icon">
                        {!user && !isLoaded ? (
                            <Skeleton className="w-[30px] h-[30px] rounded-full" />
                        ) : null}
                        <>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </>
                    </div>
                </div>

                {/* {Mobile Search}       */}
                <div className="container-fluid d-md-none mt-2 mb-3">
                    <form className="d-flex w-100">
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
                </div>
                <div className="container-fluid w-100">
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
