import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { FaHome, FaInfoCircle, FaBars, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
      const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <nav className="book-nav desktop-only">
                <div className="navcontainer">
                    <div className="hero-logo">
                        BookStore Management 
                    </div>
                    <ul>
                        <li><Link>Home</Link> </li>
                        <li><Link>About</Link> </li>
                        <li><Link>Contact</Link></li>
                    </ul>

                    <div className="usernavblock">
                        <img  alt="usericon"  />
                        <h3>Username</h3>
                    </div>
                   

                </div>
            </nav>
            <div className="mobile-book-nav">

            </div>
            <div className="mobile-book-nav mobile-only">
            <Link to="/" className="nav-item">
            <FaHome />
            <span>Home</span>
            </Link>
            <Link to="/about" className="nav-item">
            <FaInfoCircle />
            <span>About</span>
            </Link>
            <div className="nav-item">
            <FaBars />
            <span>Menu</span>
            </div>
            <div
            className="nav-item"
            onClick={() => setShowDropdown(!showDropdown)}
            >
            <FaUserCircle />
            <span>Account</span>
            {showDropdown && (
                <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Logout</Link>
                </div>
            )}
            </div>
        </div>
        </>
    )
}