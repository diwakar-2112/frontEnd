import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../Assets/logo.ico';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="ap__navbar">
      <div className="ap__navbar-links">
        <div className="ap__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="ap__navbar-links_container">
          <p><a href="#home" className="nav_home">Home</a></p>
          <p><a href="#wap">Feature</a></p>
          <p><a href="#possibility">Quiz</a></p>
          <p><a href="#features">About</a></p>
        </div>
      </div>
      <div className="ap__navbar-sign">
        <Link to="/login" className='signup_link'>
        <p>Sign in</p>
        </Link> 
        <Link to="/signup" className="login_link">
        <button type="button">Sign up</button>
        </Link>
      </div>
      <div className="ap__navbar-menu">
        {toggleMenu 
          ? <RiCloseLine color="#000000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="ap__navbar-menu_container scale-up-center" style={{background: "white" , color: "#000000"}}>
          <div className="ap__navbar-menu_container-links" >
            <p><a href="#home">Home</a></p>
            <p><a href="#wap">Feature</a></p>
            <p><a href="#possibility">Quiz</a></p>
            <p><a href="#features">About</a></p>
          </div>
          <div className="ap__navbar-menu_container-links-sign">
          <Link to="/login" className='signup_link'>
        <p>Sign in</p>
        </Link> 
        <Link to="/signup" className="login_link">
        <button type="button">Sign up</button>
        </Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
