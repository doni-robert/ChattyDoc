import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/Logo.png";
import "../../assets/styles/navbar.css";

const Navbar = () => {

    return (
        <div className="navbar">
            <div className="logo-container">
                <Link to="/">
                    <img src={logoImage} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="link-container">
                <Link to="/features"> Features </Link>
                <Link to="/login"> Login </Link>
            </div>
        </div>
    );
}

export default Navbar;