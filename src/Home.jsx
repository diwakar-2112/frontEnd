import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/features/Features';
import About from './components/About/About';
import Footer from './components/footer/Footer';
// import Mission from './components/Mission/Mission';
import FrequentQues from './components/FrequentQues/freq_ques';
import { useLocation } from 'react-router-dom';


    

function Home() {

    
    const location = useLocation();
    const phone = location.state ? location.state.phone : "";

    return (
        <div className='Home'>
            <div className='gradient_bg'>
                <Navbar phone={phone}/>
                <Hero />
            </div>
            <Features />
            <About />
            {/* <Mission /> */}
            {/* <Features /> */}
            <FrequentQues />
            <Footer />
        </div>
    )
}

export default Home