import React from 'react';
import apLogo from '../../Assets/logo.ico';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="ap__footer section__padding">
    <div className="ap__footer-heading">
      <h1 className="gradient__text">Be Ahead of the Curve with Examify</h1>
    </div>

    <div className="ap__footer-btn">
      <Link to={"/signup"}><p>Get Started Today</p></Link>
    </div>
  <div className='footer_line'></div>
  <div className='ap_footer_background'>
    <div className="ap__footer-links">
      <div className="ap__footer-links_logo">
        <img src={apLogo} alt="ap_logo" />
        {/* <p>Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved</p> */}
      </div>
      <div className="ap__footer-links_div">
        <h4>Links</h4>
        <p>Home</p>
        <p>About</p>
        <p>Features</p>
        <p>Assessments</p>
      </div>
      <div className="ap__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="ap__footer-links_div">
        <h4>Get in touch</h4>
        <p>https://www.instagram.com/examify</p>
        <p>https://www.facebook.com/examify</p>
        <p>https://www.twitter.com/examify</p>
      </div>
    </div>

    <div className="ap__footer-copyright">
      <p>@2021 Examify. All rights reserved.</p>
    </div>
    </div>
  </div>
);

export default Footer;
