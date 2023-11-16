import React from 'react'
import Landing from "./Landing"
import Ministries from './Ministries'
import Footer from './Footer'
import AboutUs from './AboutUs'
import UpCommingEvents from './UpCommingEvents'

const Home = () => {
  return (
    <div>
      <Landing />
      <Ministries />
      <AboutUs />
      <UpCommingEvents />
      <Footer />
    </div>
  )
}

export default Home