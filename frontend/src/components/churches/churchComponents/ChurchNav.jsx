import React from 'react'
import "../../../styles/churchnav.css"

const ChurchNav = ({churchName}) => {
  return (
   <nav className="church-nav">
     <div className='church-logo'>
        <p className='church-name'>
          {churchName}
        </p>
     </div>
     <div className='church-ul-menu'>
       <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Gallery</li>
        <li>Give</li>
        <li>NNE District</li>
       </ul>
     </div>
   </nav>
  )
}

export default ChurchNav