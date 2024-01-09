import React from 'react'
import Landing from "./Landing"
import Ministries from './Ministries'
import Footer from './Footer'
import AboutUs from './AboutUs'
import Sermons from './Sermons'
import Events from './Events'
import PrayerRequest from './PrayerRequest'

const Home = () => {
  return (
    <div>
      <Landing />
      <AboutUs />
      <Ministries />
      <Sermons />
      <Events />
      <PrayerRequest />
      <Footer />
    </div>
  )
}

export default Home