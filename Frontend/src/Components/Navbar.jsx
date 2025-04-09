import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <nav className="book-nav">
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
        </>
    )
}