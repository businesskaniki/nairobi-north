import React from 'react'
import ChurchNav from './churchComponents/ChurchNav'
import SliderC from './churchComponents/Slider'
import About from './churchComponents/About'
import Events from '../events/Events'

const Church = () => {

  return (
    <div>
        <ChurchNav />
        <SliderC  />
        <About />
        <Events />
    </div>
  )
}

export default Church