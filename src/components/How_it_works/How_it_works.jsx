import React from 'react'
import Cards from './Cards'
import './how_it_works.css'

function How_It_works() {
  return (
    <div className='How_It_works'>
    <h1>How It Works</h1>
    <div className='How_It_works_container'>
      <Cards heading="Assisnment Details" desc="Unlock your potential with Examify's comprehensive online assessment platform. Whether you're a student, professional, or educator, we've got you covered"/>
      <Cards heading="Assisnment Instruction" desc="Unlock your potential with Examify's comprehensive online assessment platform. Whether you're a student, professional, or educator, we've got you covered"/>
      <Cards heading="Assisnment Settings" desc="Unlock your potential with Examify's comprehensive online assessment platform. Whether you're a student, professional, or educator, we've got you covered"/>
    </div>
    </div>
  )
}

export default How_It_works
