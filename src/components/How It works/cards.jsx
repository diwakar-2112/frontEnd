import React from 'react'
import './cards.css'
function Cards(prop) {
  return (
    <div className="feature">
        <img src={prop.img} alt="No image found" />
        <h2>{prop.heading}</h2>
        <p>{prop.desc}</p>
        {/* <a href="/character" className="feature-link">Make Your Character</a> */}
    </div>
  )
}

export default Cards
