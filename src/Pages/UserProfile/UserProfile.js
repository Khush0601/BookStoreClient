import React, { useContext, useState } from 'react'
import './UserProfile.css'
import { Usercontext } from '../../App'
import { deepOrange } from '@mui/material/colors';
import { Avatar, Button, Divider} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
    const user=useContext(Usercontext)
    console.log(user)
    const [addressList,setAddressList]=useState([])
    const navigate =useNavigate()
    React.useEffect(()=>{
    const getAddress=async()=>{
     try{
     const address=await axios.get(`http://localhost:8888/thirdProject/api/v1/user/${user._id}/getAllAddresses`)
     const addressResponse=address?.data;
     setAddressList(addressResponse)
     }
     catch(e){
       console.log(e)
     }
    }
    getAddress()
    },[user?._id])

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
         <h4>Address</h4>
         <Divider/>
         <div className='buttons'>
          <Button variant="contained" sx={{marginRight:2}} onClick={()=>navigate('/userProfile/addAddress')}>Add </Button>
         {/* <Button variant="contained">Edit</Button> */}
         
         </div>
         <div className='address-part'>
          {
            addressList.length===0?'No Address added':
            addressList.map((addressDetails,index)=>{
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
             edit
            </NavLink>
             </div>

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

