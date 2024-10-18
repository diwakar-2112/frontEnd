

import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../Assets/logo.ico';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setData(JSON.parse(savedData)); 
    } else if (props.phone) {
      fetchData();
    }
  }, [props.phone]);

  function fetchData() {
    fetch(`http://localhost:8080/student/${props.phone}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data); 
        localStorage.setItem('userData', JSON.stringify(data)); 
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
      });
  }

  function handleLogout() {
    setData(null);  
    localStorage.removeItem('userData'); 
    fetch("http://localhost:8080/logout");
    navigate("/");
  }
  

  return (
    <div className="ap__navbar">
      <div className="ap__navbar-links">
        <div className="ap__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="ap__navbar-links_container">
          <p><a href="/" className="nav_home">Home</a></p>
          <p><a href="#About">About</a></p>
          <p><a href="#feature">Services</a></p>
          <p><a href="/assessments">Assessments</a></p>
        </div>
      </div>
      <div className="ap__navbar-sign">
        {data ? (
          <>
            <p>{data.name}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="signup_link">
              <p className="sign-in-text">Sign in</p>
            </Link>
            <Link to="/signup" className="login_link">
              <button type="button" className="sign-up-button">Sign up</button>
            </Link>
          </>
        )}
      </div>
      <div className="ap__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#000000" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#000000" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="ap__navbar-menu_container scale-up-center" style={{ background: 'white', color: '#000000' }}>
            <div className="ap__navbar-menu_container-links">
              <p><a href="/">Home</a></p>
              <p><a href="#About">About</a></p>
              <p><a href="#feature">Services</a></p>
              <p><a href="/assessments">Assessments</a></p>
            </div>
            <div className="ap__navbar-menu_container-links-sign">
              {data ? (
                <>
                  <p>{data.name}</p>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="signup_link">
                    <p>Sign in</p>
                  </Link>
                  <Link to="/signup" className="login_link">
                    <button type="button">Sign up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
