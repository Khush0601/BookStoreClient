import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './PaymentSuccess.css'
import { Alert, Button } from '@mui/material'
import { ServerErrorContext } from '../../App'
import App_Config from '../../app_config/app-config'
const PaymentSuccess = () => {
    const params=useParams()
    //console.log(params.paymentId)
    const navigate=useNavigate()
    const [paymentStatus,setPaymentStatus]=useState('')
    const {setServerError}=useContext(ServerErrorContext)
   React.useEffect(()=>{
    const updateOrder=async()=>{
    try{
    const updatedData=await axios.patch(`${App_Config.server_url}/thirdProject/api/v1/order/onPaymentStatus`,{
        orderId:params.paymentId
    })
    setPaymentStatus(updatedData?.data)
    setTimeout(()=>{
      navigate('/home')
    },2000)
    //console.log(updatedData)
    }
    catch(e){
    //console.log(e?.response?.statusText)
    setServerError({
      isError:true,
      errorMessage:e?.response?.statusText,
      errorDuration:3000
    })
    }
    }
    updateOrder()
   },[])
   //console.log(paymentStatus)
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
     <div className='button-cont'>
      <Button variant='contained' onClick={()=>navigate('/home')}> Go To Home</Button>
     </div>
     
    </div>
  )
}

export default PaymentSuccess
