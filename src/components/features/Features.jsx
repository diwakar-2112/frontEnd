import React, { useEffect, useState } from 'react';
import Personal from '../../Assets/personal1.png';
import Wide from '../../Assets/wide1.png';
import Analysis from '../../Assets/analysis1.png';
import Grading from '../../Assets/grading.png';
import './features.css'
import Cards from './Card'

function Features(prop) {
  return (
    <div className='container-write' id='About'>
      <div className='feature_head concert-one-regular'>About Examify</div>
        <div className='cards_container'>
        <Cards heading="Live Proctoring And Timed Assessments" img={Personal} desc="Time-bound assessments and live video sharing capabilities to monitor users during exams with full screen enabled for a fair examination.
"/>
        <Cards heading="Wide Range of Assessments" img={Wide} desc="Examify offers a wide range of assessments designed to cater to diverse learning and evaluation needs.
"/>
        <Cards heading="Section-Based Navigation And Review" img={Analysis} desc="Allow users to freely navigate between sections and questions, with a review screen to see attempted, unattempted, and marked-for-review questions."/>

        {/* <Cards heading="Instant Grading and Detailed Feedback" img={Grading} desc="Provide results immediately after the exam, with analytics on performance, strengths, and areas of improvement."/> */}
        </div>
        
    </div>
  )
}

export default Features;
