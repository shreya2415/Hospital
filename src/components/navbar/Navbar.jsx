import React from 'react';
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo"><b>VIRTUAL  AID</b></span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>
        </div>
      {/* navbar */}
    </div>
  )
}

export default Navbar;
