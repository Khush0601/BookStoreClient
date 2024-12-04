import React, { useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './PaymentSuccess.css'
import { Alert } from '@mui/material'
const PaymentSuccess = () => {
    const params=useParams()
    console.log(params.paymentId)
    const navigate=useNavigate()
    const [paymentStatus,setPaymentStatus]=useState('')
   React.useEffect(()=>{
    const updateOrder=async()=>{
    try{
    const updatedData=await axios.patch('http://localhost:8888/thirdProject/api/v1/order/onPaymentStatus',{
        orderId:params.paymentId
    })
    setPaymentStatus(updatedData?.data)
    setTimeout(()=>{
      navigate('/home')
    },4000)
    console.log(updatedData)
    }
    catch(e){
    console.log(e?.response?.statusText)
    }
    }
    updateOrder()
   },[])
   console.log(paymentStatus)
  return (
    <div className='payment-success-container'>
     {
      paymentStatus?.message==='order placed successfully'?<div className='success-result'>
      <Alert variant="filled" severity="success" className='alert'>
        {paymentStatus?.message}
      </Alert>
      </div>:
      <div className='failure-result'>
      <Alert variant="filled" severity="error" className='alert'>
        {paymentStatus?.message}
      </Alert>
      </div>
      
     }
    </div>
  )
}

export default PaymentSuccess
