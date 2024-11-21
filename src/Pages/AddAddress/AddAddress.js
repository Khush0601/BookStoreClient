import React from 'react'
import './AddAddress.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Divider, TextField } from '@mui/material';
const AddAddress = () => {
  return (
    <div className='add-address-container'>
      <div className='add-address-box'>
        <div className='add-address-title'>
          <div><KeyboardBackspaceIcon/></div>
          <h4>ADDRESS</h4>
          </div> 
          <div className='add-new-address-title'>
            <h5>ADD NEW ADDRESS</h5>
            <Divider />
          </div>
          <div className='delivering-name-mobile'>
          <TextField id="Name" label="Name" variant="standard" fullWidth required />
          <TextField id="Mobile" label="Mobile" variant="standard" fullWidth required sx={{marginTop:2}} />
          </div>
          <div className='delivering-rest-Details'>
           <div className='delivering-pincode-state'>
           <TextField id="pincode" label="pincode" variant="standard"  required  />
           <TextField id="state" label="state" variant="standard" required  />
           </div>
           <TextField id="street" label="Address(street,near By Area)" variant="standard" fullWidth required sx={{marginTop:2}} />
           <TextField id="city" label="city/Town" variant="standard" fullWidth required sx={{marginTop:2}} />
          </div>
          <div className='type-of-address'>
            <h4>Type of Address</h4>
            <form>
              <label>
                <input type='radio' value='home' name="home"/>
                Home
              </label>
              <label>
                <input type='radio' value="work"  name="work"/>
                Work
              </label>
             </form>
            
          </div>
          <div className='buttons'>
             <Button variant='contained'>Submit</Button>
          </div>
         
      </div>
    </div>
  )
}

export default AddAddress