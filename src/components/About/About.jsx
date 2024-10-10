// import React from 'react';
// // import Feature from '../../components/feature/Feature';
// import './about.css';

// const About = () => (
//   <div className="ap__whatap section__margin" id="About">
//     <div className="ap__whatap-feature">
      
//     </div>
//     <div className="ap__whatap-heading">
//       <h1 className="blisful">About Examify <br /></h1>
//       <p>At Examify, we are passionate about transforming the way assessments are conducted in education. Founded with a vision to make high-quality examinations accessible and user-friendly, our platform empowers students and educators to achieve their academic goals.</p>
//     </div>
    
//     <div className="ap__whatap-container">
      
//     </div>
//   </div>
// );

// export default About;
import React from "react";

import "./about.css";





import { FaLock, FaLaptop, FaGlobe, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="services-section" id="feature">
      <h2 className="services-title">At Your Service</h2>
      <div className="services-container">
        <div className="service-item">
          <FaLock className="service-icon" />
          <h3>Authentication</h3>
          <p>
            Secure your journey with our robust authentication system, ensuring a
            safe and personalized experience!
          </p>
        </div>

        <div className="service-item">
          <FaLaptop className="service-icon" />
          <h3>Test Management</h3>
          <p>
            Unlock a world of possibilities with our powerful test management
            system.
          </p>
        </div>

        <div className="service-item">
          <FaGlobe className="service-icon" />
          <h3>Intuitive Test-Taking Interface</h3>
          <p>
            Immerse yourself in a user-friendly test-taking environment designed
            for optimal performance.
          </p>
        </div>

        <div className="service-item">
          <FaHeart className="service-icon" />
          <h3>Personalized User Dashboard</h3>
          <p>
            Access your personalized dashboard to track your test history,
            scores, and progress over time.
          </p>
        </div>
      </div>
    </div>
  );
};



export default About;
