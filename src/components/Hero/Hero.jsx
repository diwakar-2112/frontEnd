import React from 'react';
// import people from '../../assets/people.png';
import access from '../../Assets/access.png';
import './hero.css';
import { Link } from 'react-router-dom';


const Hero = () => (

    <div className="ap__header section__padding" id="home">
        <div className="ap__header-content">
        <h1 className="gradient__text">Welcome to Examify, your ultimate destination for professional assessments!</h1>
        <p>Discover your true potential with Examify's all-encompassing online assessment platform. Whether you're a student, professional, or educator, we have everything you need!"</p>

            <div className="ap__header-content__input">
                {/* <input type="email" placeholder="Your Phone Number" /> */}
                {/* <Link to={"/signup"}><button type="button" >Get Started</button></Link> */}
            </div>

            {/* <div className="ap__header-content__people">
                <p>1,600 people requested access a visit in last 24 hours</p>
            </div> */}
        </div>

        <div className="ap__header-image">
            <img src={access} />
        </div>
    </div>
);

export default Hero;
