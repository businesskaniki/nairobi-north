import React from 'react'
import Landing from "./Landing"
import Ministries from './Ministries'
import Footer from './Footer'
import AboutUs from './AboutUs'

const Home = () => {
  return (
    <div>
      <Landing />
      <Ministries />
      <AboutUs />
      <Footer />
    </div>
  )
}

export default Home