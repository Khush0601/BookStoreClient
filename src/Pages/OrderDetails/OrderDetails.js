import React, { useContext, useState } from 'react'
import './Orderdetails.css'
import { useNavigate } from 'react-router'
import { Divider } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ServerErrorContext, Usercontext } from '../../App';
import axios from 'axios'
import App_Config from '../../app_config/app-config';
const OrderDetails = () => {
    const user=useContext(Usercontext)
    const {setServerError}=useContext(ServerErrorContext)
    const naivgate=useNavigate()
    const [orderList,setOrderList]=useState([])

    React.useEffect(()=>{
        const getAllOrders=async()=>{
       try{
      const allOrders=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/user/${user?._id}/getAllOrders`)
      setOrderList(allOrders?.data)
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
        getAllOrders()
    },[user?._id])
  //console.log(user)
  //console.log(orderList)
  return (
    <div className='order-contaiener'>
     <div className='order-box'>
     <div className='order-title'>
        <div onClick={()=>naivgate(-1)}><KeyboardBackspaceIcon/></div>
           <h4>My orders</h4>
          </div> 
        <Divider/>
        {
            orderList.length!==0?<>{orderList?.map((orderDetails,orderIndex)=>{
                return <div className='orders' key={orderDetails?._id}>
               <div className='img'>
                <img src={orderDetails?.productImage} alt={orderDetails?.productName} width={100} height={100}/>
               </div>
               <div className='rest'>
                <h4>{orderDetails?.productName}</h4>
                <p>{orderDetails?.productDescription}</p>
               </div>
        </div>
            })}</>:
            <>
            <div>
                <h2>No orders yet</h2>
            </div>
        </>
        }
     </div>
    </div>
  )
}

export default OrderDetails