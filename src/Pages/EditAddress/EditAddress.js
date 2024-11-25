import { Button, Divider, TextField } from '@mui/material'
import './editaddress.css'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const EditAddress = () => {
    const data=useLocation()
    let result=data.state
    console.log(result)
   const navigate=useNavigate()
    const [editableAddress,setEditableAddress]=useState(()=>result)
    const editDetailsForm={
      addressId:editableAddress._id,
      userId:editableAddress.userId,
      name:editableAddress.name,
      mobileNo:editableAddress.mobileNo,
      pincode:editableAddress.pincode,
      state:editableAddress.state,
      street:editableAddress.street,
      city:editableAddress.city,
      typeOfAddress:editableAddress.typeOfAddress,
    }
    const [editAddress,setEditAddress]=useState(editDetailsForm)
    // console.log(editAddress)
    const hadleEditFields=(e,type)=>{
    setEditAddress((p)=>{
      return {...p,[type]:e.target.value}
    })
    }
    const handleRadioUpdate=(e)=>{
   setEditAddress((p)=>{
    return {...p,typeOfAddress:e.target.value}
   })
    }
    console.log(editAddress)
    console.log('editableAddressDetails',editableAddress)
  return (
    <div className='edit-address-container'>
      <div className='edit-address-box'>
        <div className='edit-address-title'>
        <div onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></div>
           <h4>ADDRESS</h4>
          </div> 
          <div className='edit-new-address-title'>
            <h5>EDIT ADDRESS</h5>
            <Divider />
          </div>
           <form>
           <div className='edit-delivering-name-mobile'>
          <TextField id="Name" label="name" variant="standard" fullWidth required value={editAddress.name} onChange={(e)=>hadleEditFields(e,'name')}/>
          <TextField id="mobileNo" label="Mobile" variant="standard" fullWidth required sx={{marginTop:2}} value={editAddress.mobileNo} onChange={(e)=>hadleEditFields(e,'mobileNo')} />
          </div>
          <div className='edit-delivering-rest-Details'>
           <div className='edit-delivering-pincode-state'>
           <TextField id="pincode" label="pincode" variant="standard"  required  value={editAddress.pincode} onChange={(e)=>hadleEditFields(e,'pincode')} />
           <TextField id="state" label="state" variant="standard" required  value={editAddress.state} onChange={(e)=>hadleEditFields(e,'state')}/>
           </div>
           <TextField id="street" label="Address(street,near By Area)" variant="standard" fullWidth required sx={{marginTop:2}} value={editAddress.street} onChange={(e)=>hadleEditFields(e,'street')}  />
           <TextField id="city" label="city/Town" variant="standard" fullWidth required sx={{marginTop:2}} value={editAddress.city} onChange={(e)=>hadleEditFields(e,'city')}/>
          </div>
          <div className='edit-type-of-address'>
            <h4>Type of Address</h4>
            <div>
            <label>
                <input type='radio' value='Home' name="typeOfAddress" checked={editAddress.typeOfAddress==='Home'} onChange={handleRadioUpdate}/>
                Home
              </label>
              
              <label>
                <input type='radio' value="Work"  name="typeOfAddress" checked={editAddress.typeOfAddress==='Work'} onChange={handleRadioUpdate}/>
                Work
              </label>
            </div>
            
            
          </div>
          <div className='submit-buttons'>
             <Button type='submit' variant='contained'>Submit</Button>
          </div>
        </form>
         
      </div>
    </div>
  )
}

export default EditAddress