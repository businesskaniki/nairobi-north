import React from 'react'
import "../../styles/ministries.css"

const Ministries = () => {

  return (
    <div className='ministries-container'>
        <div className='ministries-wraper'>
            <div className="ministries-heading">
                <h2>Ministries</h2>
                <h3>We are pefa Nairobi North, a dynamic, family church with people of all ages.</h3>
            </div>
            <div className='mimistries-cards-cont'>
                <div className="ministries-div-1">
                    <div className="ministries kings">
                        <h4>Kings</h4>
                    </div>
                    <div className="ministries queens">
                        <h4>Queens</h4>
                    </div>
                </div>
                <div className="ministries-div-2">
                    <div className="ministries youths">
                        <h4>Youths</h4>
                    </div>
                    <div className="ministries teens">
                        <h4>Tenns</h4>
                    </div>
                    <div className="children ministries">
                        <h4>Children</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Ministries