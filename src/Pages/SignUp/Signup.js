import React, { useState } from 'react'
import './signUp.css'
import { Box, Button, TextField } from '@mui/material'
import Password from '../../lib/Password/Password'



const Signup = () => {
  const initForm={
    name:"",
    email:"",
    userId:"",
    password:"",
    confirmPassword:""

  }
 const [signUpForm,setSignUpForm]=useState(initForm)
//  const [errorMessage,setErrorMessage]=useState(initForm)
 const onSignUpFormUpdate=(e,type)=>{
  setSignUpForm((p)=>{
    return {...p,[type]:e.target.value}
  })
 }
//  const validator=(formdata)=>{
// //  let error={}
// //  let regex = /^[a-zA-Z]+$/;
// //  if(!regex.text(formdata?.name)){
// //   error.name='name is not valid'
// //  }
//  }
 const onSignUpformSubmit=(e)=>{
 e.preventDefault(

 )
 }
 console.log(signUpForm)
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
      onSubmit={onSignUpformSubmit}
    >
     <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{marginTop:1.5}}  value={signUpForm.name} onChange={(e)=>onSignUpFormUpdate(e,'name')}/>
     <TextField id="Email" label="Email" variant="outlined" fullWidth sx={{marginTop:1.5}} value={signUpForm.email} onChange={(e)=>onSignUpFormUpdate(e,'email')}/>
     <TextField id="userId" label="UserId" variant="outlined" fullWidth sx={{marginTop:1.5}} value={signUpForm.userId} onChange={(e)=>onSignUpFormUpdate(e,'userId')}/>
     <Password label={"Password"} id={'Password'} value={signUpForm.password} onChange={(e)=>onSignUpFormUpdate(e,'password')}/>
     <Password label={"Confirm Password"} id={"Confirm Password"} value={signUpForm.component} onChange={(e)=>onSignUpFormUpdate(e,'confirmPassword')}/>
     <Button type='submit' variant='contained' sx={{marginTop:2}}>SUBMIT</Button>
     
     
     
    </Box>

      


       
      </div>
    </div>
  )
}

export default Signup