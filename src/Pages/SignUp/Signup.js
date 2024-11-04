import React from 'react'
import './signUp.css'
import { Box, Button, TextField } from '@mui/material'
import ReusableComponent from '../../Component/Reusable component/reusableComponent'


const Signup = () => {
  const initForm={
    name:"",
    email:"",
    userId:"",
    password:"",
    confirmPassword:""

  }
 


  return (
    <div className='signUp-container'>
      <div className='signUp-modal'>
        <div className='signUp-header'>
          <h2>SignUp Form</h2>
          <h5>Please fill the form to create an account</h5>
        </div>
        <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{width:360,minHeight:350}}
    >
     <TextField id="Name" label="Name" variant="outlined" sx={{marginTop:1,width:350}}/>
     <TextField id="Email" label="Email" variant="outlined" sx={{marginTop:1,width:350}}/>
     <TextField id="userId" label="UserId" variant="outlined" sx={{marginTop:1,width:350}}/>
     {/* <TextField id="password" label="password" variant="outlined" sx={{marginTop:1,width:350}}/> */}
     <ReusableComponent/>
     <TextField id="Confirm Password" label="Confirm Password" variant="outlined" sx={{marginTop:1,width:350}}/>
     <Button type='submit' variant='contained' sx={{marginTop:2}}>SUBMIT</Button>
     
     
    </Box>

      


       
      </div>
    </div>
  )
}

export default Signup