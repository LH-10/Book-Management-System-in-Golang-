import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import { FaHome, FaInfoCircle, FaBars, FaUserCircle, FaAngleDown , FaSignOutAlt, FaAngleUp, FaUserAlt} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { APP_NAME } from "../configs/Names";

export default function Navbar() {

    
    const [desktopdropdownOpen, setDesktopDropdownOpen] = useState(false);
    const navigate=useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || "")
    const handleLogout=()=>{
        try {
            localStorage.clear()
            toast.success("Logout Successfull !",{theme:"light",autoClose:1000,onClose:(()=>{window.location.href="/"})})
        } catch (error) {
            toast.error("Could not logout")
        }
    }
    return (
        <>
            <nav className="book-nav desktop-only">
                <div className="navcontainer">
                    <div className="hero-logo" onClick={()=>{navigate("/home/dashboard")}}>
                        {APP_NAME}
                    </div>
                    <ul>
                        <li><Link to="/home/dashboard"  >Home</Link> </li>
                        <li><Link>About</Link> </li>
                        <li><Link>Contact</Link></li>
                    </ul>

                    <div className="usernavblock"  onClick={()=>{setDesktopDropdownOpen(!desktopdropdownOpen)}}>
                        <FaUserCircle />
                        <h3>{username}</h3>
                        {desktopdropdownOpen?<FaAngleUp/>:<FaAngleDown />}
                    </div>
                    {desktopdropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={handleLogout}>
                                <FaSignOutAlt style={{ marginRight: '8px' }} />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}

                </div>
            </nav>
            <div className="mobile-book-nav">

            </div>
            <div className="mobile-book-nav mobile-only">
                <Link to="/home/dashboard" className="nav-item">
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
                            <Link><FaUserAlt size={12}/>{username || "...." }</Link>
                            <Link onClick={handleLogout}> <FaSignOutAlt size={15}/> Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}