import React from 'react'
import './Testimonials.css'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

// Import Swiper React components

const TestmonialCard = ({testimonialDetails,width=400}) => {
  return (
    <div className='testimonials-card-container' style={{width:`${width}px`}}>
      <div className='avtar-field'>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 50,height:50, }}>{testimonialDetails?.userName?.charAt(0).toUpperCase()}</Avatar>
      </div>
     
      <div className='description-field'>
       {testimonialDetails.description}
      </div>
    </div>
  )
}

export default TestmonialCard
