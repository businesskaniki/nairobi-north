import React from 'react'
import Landing from "./Landing"
import Ministries from './Ministries'
import Footer from './Footer'
import AboutUs from './AboutUs'
import UpCommingEvents from './UpCommingEvents'
import Sermons from './Sermons'
import Events from './Events'

const Home = () => {
  return (
    <div>
      <Landing />
      <AboutUs />
      <Ministries />
      <Sermons />
      <Events />
      <UpCommingEvents />
      <Footer />
    </div>
  )
}

export default Home