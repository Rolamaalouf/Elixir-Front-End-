import React from 'react';
import './header.css';
import logo from "./assets/logo.png"; // adjust the path as needed

const Header = () => {
  return (
    <header className="header">
      <a className="nav-item" href="/">Home</a>
      <a className="nav-item" href="/about">About Us</a>
      
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      
      <a className="nav-item" href="/menu">Menu</a>
      <a className="nav-item" href="/contact">Contact Us</a>
    </header>
  );
};

export default Header;
