import React, { useContext, useState } from 'react'
import './ReviewYourOrder.css'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Divider } from '@mui/material';
import { ServerErrorContext, Usercontext } from '../../App';
import axios from 'axios';
import {  NavLink } from 'react-router-dom';
 import App_Config from '../../app_config/app-config';

 const ReviewYourOrder = () => {
  const {user}=useContext(Usercontext)
   const {setServerError}=useContext(ServerErrorContext)
  console.log('user',user)
  const navigate=useNavigate()
  const data=useLocation()
  let productData=data.state
  //console.log(productData)
  
  const [orderFullDetails,setOrderFullDetails]=useState(()=>productData)
  const [defaultAddress,setDefaultAddress]=useState(null)
  React.useEffect(()=>{
    const getDefaultAddress=async()=>{
     try{
    const address=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/user/${user?._id}/getDefaultAddresses`)
    const addressResponse=address?.data
    setDefaultAddress(addressResponse)
     }
     catch(e){
      //console.log(e?.response?.statusText)
      setServerError({
        isError:true,
        errorMessage:e?.message,
        errorDuration:3000
      })
     }
    }
    if(user.addresses.length!==0){
      getDefaultAddress()
    }
   
  },[user?._id])

  const onPayment=async()=>{
 try{
     const paymentDetails=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/order/onPayment`,{
      productId:orderFullDetails?._id,
      userId:user?._id,
      addressId:defaultAddress?._id
})
    //console.log('paymentDetails',paymentDetails)
    const cashfree = window.Cashfree({
      mode: "sandbox"
  });
  const checkoutOptions = {
    paymentSessionId: paymentDetails.data.payment_session_id ,
    redirectTarget: '_self',
  };
  cashfree.checkout(checkoutOptions);
    }
    catch(e){
     //console.log(e)
     setServerError({
      isError:true,
      errorMessage:e?.message,
      errorDuration:3000
    })
    }
  }
  //console.log('orderDetails',orderFullDetails)
  //console.log('defaultAddress',defaultAddress)
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
        <div className='deliver-address'><h4>Delivery Address</h4></div>
        <Divider/>
        <div className='select-address'>
        <div>
        {user.addresses.length===0 && <h4>No Address please add address</h4>}
        {(user.addresses.length>0 && !defaultAddress) && <h4>please make default address </h4>}
        {(user.addresses.length>0 && defaultAddress) && <>
        <h4>{defaultAddress?.name}</h4>
        <p>{defaultAddress?.mobileNo}</p>
        <p>{defaultAddress?.street}</p>
        <p>{defaultAddress?.city}</p>
        <p>{defaultAddress?.state}</p>
        <p>{defaultAddress?.pincode}</p>
        </>}
      {user.addresses.length===0 && <NavLink to='/userProfile/addAddress' state={{page:'payment'}} >Add Address</NavLink>}
      {(user.addresses.length>0 ) && <NavLink to='/userProfile' state={{page:'payment'}}>Change Address</NavLink>}
        
        </div>
        <div>
          {defaultAddress?.typeOfAddress}
        </div>
        </div>
        <div className='proceed-button'>
          <Button variant='contained' onClick={onPayment}>Proceed For Payment</Button>

        </div>
      </div>
    </div>
  )
}

export default ReviewYourOrder