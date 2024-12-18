import React, { useContext, useState } from 'react'
import './AddAddress.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Divider, TextField } from '@mui/material';
import axios from 'axios';
import { ServerErrorContext, Usercontext } from '../../App';
import { useNavigate } from 'react-router';
import App_Config from '../../app_config/app-config';
const AddAddress = () => {
  const user=useContext(Usercontext)
   const {setServerError}=useContext(ServerErrorContext)
  //console.log(user)
const navigate=useNavigate()
  const addressDetailsForm={
    userId:user?._id,
    name:"",
    mobileNo:"",
    pincode:"",
    state:"",
    street:"",
    city:"",
    typeOfAddress:""
  }
  const [addressDetails,setAddressDetails]=useState(addressDetailsForm)
  const [deliveringDetails,setDeliveringDetails]=useState([])
  const onAddressFieldUpdate=(e,type)=>{
  setAddressDetails((p)=>{
  return {...p,[type]:e.target.value}
  })
  }

   const onRadioButtonUpdate=(e)=>{
   setAddressDetails((p)=>{
    return {...p,typeOfAddress:e.target.value}
   })
   }
   const onAddressSubmit=async(e)=>{
    e.preventDefault()
    try{
    const addAddress=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/user/addAddress`,{
     userId:addressDetails.userId,
     name:addressDetails.name,
     mobileNo:addressDetails.mobileNo,
     street:addressDetails.street,
     city:addressDetails.city,
     state:addressDetails.state,
     pincode:addressDetails.pincode,
     typeOfAddress:addressDetails.typeOfAddress
    })
    const addAddressResponse=addAddress?.data;
    setDeliveringDetails((p)=>{
      return [...p,addAddressResponse]
    })
    setAddressDetails(addressDetailsForm)
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
  //console.log(addressDetails)
  //console.log(deliveringDetails)
  return (
    <div className='add-address-container'>
      <div className='add-address-box'>
        <div className='add-address-title'>
          <div onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></div>
          <h4>ADDRESS</h4>
          </div> 
          <div className='add-new-address-title'>
            <h5>ADD NEW ADDRESS</h5>
            <Divider />
          </div>
           <form onSubmit={onAddressSubmit}>
           <div className='delivering-name-mobile'>
          <TextField id="Name" label="name" variant="standard" fullWidth required value={addressDetails.name} onChange={(e)=>onAddressFieldUpdate(e,'name')}/>
          <TextField id="mobileNo" label="Mobile" variant="standard" fullWidth required sx={{marginTop:2}} value={addressDetails.mobileNo}  onChange={(e)=>onAddressFieldUpdate(e,'mobileNo')}/>
          </div>
          <div className='delivering-rest-Details'>
           <div className='delivering-pincode-state'>
           <TextField id="pincode" label="pincode" variant="standard"  required value={addressDetails.pincode}  onChange={(e)=>onAddressFieldUpdate(e,'pincode')} />
           <TextField id="state" label="state" variant="standard" required value={addressDetails.state}  onChange={(e)=>onAddressFieldUpdate(e,'state')}/>
           </div>
           <TextField id="street" label="Address(street,near By Area)" variant="standard" fullWidth required sx={{marginTop:2}} value={addressDetails.street}  onChange={(e)=>onAddressFieldUpdate(e,'street')}/>
           <TextField id="city" label="city/Town" variant="standard" fullWidth required sx={{marginTop:2}} value={addressDetails.city}  onChange={(e)=>onAddressFieldUpdate(e,'city')}/>
          </div>
          <div className='type-of-address'>
            <h4>Type of Address</h4>
            <div>
            <label>
                <input type='radio' value='Home' name="typeOfAddress" onChange={onRadioButtonUpdate} checked={addressDetails.typeOfAddress==='Home'}/>
                Home
              </label>
              
              <label>
                <input type='radio' value="Work"  name="typeOfAddress" onChange={onRadioButtonUpdate} checked={addressDetails.typeOfAddress==='Work'}/>
                Work
              </label>
            </div>
            
            
          </div>
          <div className='buttons'>
             <Button type='submit' variant='contained'>Submit</Button>
          </div>
        </form>
         
      </div>
    </div>
  )
}

export default AddAddress