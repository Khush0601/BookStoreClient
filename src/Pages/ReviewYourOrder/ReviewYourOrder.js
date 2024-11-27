import React, { useState } from 'react'
import './ReviewYourOrder.css'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider } from '@mui/material';

 const ReviewYourOrder = () => {
  const navigate=useNavigate()
  const data=useLocation()
  let productData=data.state
  console.log(productData)
  
  const [orderFullDetails,setOrderFullDetails]=useState(()=>productData)
  
  console.log('orderDetails',orderFullDetails)
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
           <img src={orderFullDetails?.image} alt={orderFullDetails?.name}/>
          </div>
          <div className='order-rest-details'>
            <h5>{orderFullDetails?.name}</h5>
            <p>{orderFullDetails?.shortDescription}</p>
            <p>price:{orderFullDetails?.price}</p>
            <p>Qty:1</p>
          </div>
        </div>
        <div className='select-address'>
         default address
        </div>
      </div>
    </div>
  )
}

export default ReviewYourOrder