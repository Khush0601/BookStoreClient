import React, { useContext, useState } from 'react'
import './UserProfile.css'
import { ServerErrorContext, Usercontext } from '../../App'
import { deepOrange } from '@mui/material/colors';
import { Avatar, Button, Divider} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import App_Config from '../../app_config/app-config';
const UserProfile = () => {
    const {user}=useContext(Usercontext)
    const {setServerError}=useContext(ServerErrorContext)
    console.log(user)
    const location=useLocation()
    let isRedirectionPage=location.state
    //console.log(isRedirectionPage)
    const [addressList,setAddressList]=useState([])
    const [defaultAddressId,setDefaultAddressId]=useState('')
    const navigate =useNavigate()
    
    React.useEffect(()=>{
    const getAddress=async()=>{
     try{
     const address=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/user/${user._id}/getAllAddresses`)
     const addressResponse=address?.data;
     console.log(addressResponse)
     let defaultAddress=addressResponse?.find((el)=>el.isDefault==='true')
     if(defaultAddress){
      setDefaultAddressId(defaultAddress._id)
     }
    
     setAddressList(addressResponse)
     }
     catch(e){
       //console.log(e)
       setServerError({
        isError:true,
        errorMessage:e?.response?.statusText,
        errorDuration:3000
      })
     }
    }
    getAddress()
    },[user?._id])


   const handleSetDefault=async(addressId)=>{
    setDefaultAddressId(addressId)
     try{
    const sendDefaultValue=await axios.patch(`${App_Config.server_url}/thirdProject/api/v1/user/setDefaultAddress`,{
    userId:user?._id,
    addressId:addressId
   })
   const updatedDefaultValue=sendDefaultValue?.data?.updateAddress
   if(isRedirectionPage.page==='payment'){
     navigate(-1)
   }
   //console.log(updatedDefaultValue)
   
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
    console.log('defaultAddress',defaultAddressId)
    console.log(addressList)
  return (
    <div className='user-profile-container'>
      <div className='user-profile-box'>
         <div className='user-part'>
        
           <div className='user-avatar'>
           <Avatar sx={{ bgcolor: deepOrange[500], width: 50,height:50, }}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
           </div>
           <div className='user-details'>
             <div>{user?.name.toUpperCase()}</div>
             <div>{user?.email}</div>
           </div>
          
         </div>
         <Divider/>
        <div className='user-address-part'>
       <div className='address-heading'>
       <div onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></div>
       <h4>Address</h4>
       </div>
         <Divider/>
         <div className='buttons'>
          <Button variant="contained" sx={{marginRight:2}} onClick={()=>navigate('/userProfile/addAddress')}>Add  New Address</Button>
         <Button variant="contained" onClick={()=>navigate('/orders')}> My Order</Button>
         
         </div>
         <div className='address-part'>
          {
            addressList?.length===0?'No Address added':
            addressList?.map((addressDetails,index)=>{
              return  <div className='address-box' key={addressDetails?._id}>
                <div className='delivering-details'>
              <h5>{addressDetails?.name}</h5>
              <p>{addressDetails?.street}</p>
              <p>{addressDetails?.city}</p>
              <p>{addressDetails?.pincode}</p>
              <p>{addressDetails?.state}</p>
             <div className='mobile'>
             <span>Mobile No.-</span>
             <span>{addressDetails?.mobileNo}</span>
             <NavLink state={addressDetails} to="/userProfile/editAddress">
             <EditIcon/>
            </NavLink>
             </div>
             <label>
              <input type='checkbox' checked={addressDetails._id===defaultAddressId} onChange={()=>handleSetDefault(addressDetails?._id)} />
              Mark this as your default Address
             </label>

           </div>
         <div className='address-type'>{addressDetails?.typeOfAddress}</div>
            </div>
            })
          }
          </div>
        </div>
      </div>
       
    </div>
   
  )
}

export default UserProfile

