import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'
const PaymentSuccess = () => {
    const params=useParams()
    console.log(params.paymentId)
    const navigate=useNavigate()
   React.useEffect(()=>{
    const updateOrder=async()=>{
    try{
    const updatedData=await axios.patch('http://localhost:8888/thirdProject/api/v1/order/onPaymentStatus',{
        orderId:params.paymentId
    })
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
  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess
