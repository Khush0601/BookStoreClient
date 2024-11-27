import React from 'react'
import './ReviewYourOrder.css'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider } from '@mui/material';
 const ReviewYourOrder = () => {
  const params=useParams()
  console.log('productId',params)
  const navigate=useNavigate()
  return (
    <div className='review-order-container'>
      <div className='review-order-box'>
      <div className='review-order-title'>
        <div onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></div>
           <h4>Review your order</h4>
          </div> 
        <Divider/>
        <div className='review-order-details'>
          <div className='order-img'>
           {/* <img src={} alt={}/> */}
          </div>
          <div className='order-rest-details'></div>
        </div>
      </div>
    </div>
  )
}

export default ReviewYourOrder