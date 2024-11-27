import React, { useState } from 'react'
import './ReviewYourOrder.css'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider } from '@mui/material';
import axios from 'axios';
 const ReviewYourOrder = () => {
  const params=useParams()
  console.log('productId',params)
  const navigate=useNavigate()
//   http://localhost:8888/thirdProject/api/v1/product/6725c728da1989ccc05077ec
  const [orderFullDetails,setOrderFullDetails]=useState({})
  React.useEffect(()=>{
   const getOrderDetailsById=async()=>{
    try{
        const orderDetails=await axios.get(`http://localhost:8888/thirdProject/api/v1/product/${params.productId}`)
        //  console.log(orderDetails?.data)
        setOrderFullDetails(orderDetails?.data)
        }
        catch(e){
       console.log(e?.response?.statusText)
        }
   }
   if(params.productId){
    getOrderDetailsById()
   }
  },[params?.productId])
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