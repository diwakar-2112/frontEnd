import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../Assets/logo.ico';
import user_icon from '../../Assets/user_icon.jpg';
import './navbar2.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  function handleLogout(){
    fetch("http://localhost:8080/logoutAdmin");
    navigator("/");
  }
  const navigator= useNavigate(); 

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="ap__navbar">
      <div className="ap__navbar-links">
        <div className="ap__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="ap__navbar-links_container">
          <p><a href="/" className="nav_home">Home</a></p>
        </div>
      </div>
      <div className="ap__navbar-sign">
        {/* <p>Sign in</p> */}
        <button type="button"  onClick={handleLogout} className='logout_btn'>Logout</button>
        <img src={user_icon} className='user-ico'/>
      </div>
      <div className="ap__navbar-menu">
        {toggleMenu 
          ? <RiCloseLine color="#000000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="ap__navbar-menu_container scale-up-center" style={{background: "white" , color: "#000000"}}>
          <div className="ap__navbar-menu_container-links" >
            <p><a href="/">Home</a></p>
            
            {/* 
            <p><a href="#possibility">Quiz</a></p>
            <p><a href="#features">About</a></p> */}
          </div>
          <div className="nav_add_test" ><button className="nav_add_test_btn">Add Test</button></div>
          <div className="ap__navbar-menu_container-links-sign">
            <button type="button"  onClick={handleLogout} className='logout_btn'>Logout</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
