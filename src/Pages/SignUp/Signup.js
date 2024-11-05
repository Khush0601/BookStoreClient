import React, { useEffect, useState } from 'react'
import './signUp.css'
import { Box, Button, TextField } from '@mui/material'
import Password from '../../lib/Password/Password'
import axios from 'axios'



const Signup = () => {
  const initForm={
    name:"",
    email:"",
    userId:"",
    password:"",
    confirmPassword:""

  }
 const [signUpForm,setSignUpForm]=useState(initForm)
 const [errorMessage,setErrorMessage]=useState({...initForm,serverError:''})
 const [showMessage,setShowMessage]=useState('')
 const onSignUpFormUpdate=(e,type)=>{
  setSignUpForm((p)=>{
    return {...p,[type]:e.target.value}
  })
 }
 const validator=(formdata)=>{
 let error={}
 let regex = /^[a-zA-Z]+$/;
 let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 let userIdRegex = /^[a-zA-Z0-9_]{3,15}$/;
 let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 if(!regex.test(formdata?.name)){
  error.name='name is not valid'
 }
 if(!emailRegex.test(formdata?.email)){
   error.email='email is not valid'
 }
 if(!userIdRegex.test(formdata?.userId)){
error.userId="User ID must be 3-15 characters and can only contain letters, numbers, or underscores'"
 }
if(!passwordRegex.test(formdata?.password)){
  error.password='Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character';
}
if(formdata?.confirmPassword===''){
  error.confirmPassword='conirm Password cannot be empty'
}
 return error
 }


const onSignUpformSubmit=async(e)=>{
 e.preventDefault()
 try{
let error=validator(signUpForm)
if(Object.keys(error).length>0){
  setErrorMessage(error)
}
else{
const signUpUser=await axios.post('http://localhost:8888/thirdProject/api/v1/user/signUp',{
  name:signUpForm.name,
  email:signUpForm.email,
  userId:signUpForm.userId,
  password:signUpForm.password,
  confirmPassword:signUpForm.confirmPassword
})
const response=signUpUser.data
console.log(response)
if(response && response?.message==='register successfully'){
 setTimeout(()=>{
 setShowMessage('register successfully')
 },1000)
}

}
 }
 catch(e){
  console.log(e)
  setErrorMessage((p)=>{
 return {...p,serverError:e.response.data.message??e.message}
  })
 }
}
 useEffect(()=>{
  if(errorMessage?.name!=='' || errorMessage?.email!=='' || errorMessage?.userId!=='' || errorMessage.password!=='' || errorMessage?.confirmPassword!==''){
  setTimeout(()=>{
   setErrorMessage(initForm)
  },5000)
  }
 },[errorMessage])
 console.log(errorMessage)
 console.log(signUpForm)
  return (
    <div className='signUp-container'>
      <div className='signUp-modal'>
        <div className='signUp-header'>
          <h2>SignUp Form</h2>
          <h5>Please fill the form to create an account</h5>
        </div>
        {
          showMessage && <div style={{color:'green'}}>{showMessage}</div>
        }
        <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{width:360,minHeight:350}}
      onSubmit={onSignUpformSubmit}
    >
     <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{marginTop:1.5}}  value={signUpForm.name} onChange={(e)=>onSignUpFormUpdate(e,'name')}/>
     {errorMessage?.name && <div style={{color:"red"}}>{errorMessage?.name}</div>}
     <TextField id="Email" label="Email" variant="outlined" fullWidth sx={{marginTop:1.5}} value={signUpForm.email} onChange={(e)=>onSignUpFormUpdate(e,'email')}/>
     {errorMessage?.email && <div style={{color:"red"}}>{errorMessage?.email}</div>}
     <TextField id="userId" label="UserId" variant="outlined" fullWidth sx={{marginTop:1.5}} value={signUpForm.userId} onChange={(e)=>onSignUpFormUpdate(e,'userId')}/>
     {errorMessage?.userId && <div style={{color:"red"}}>{errorMessage?.userId}</div>}
     <Password label={"Password"} id={'Password'} value={signUpForm.password} onChange={(e)=>onSignUpFormUpdate(e,'password')}/>
     {errorMessage?.password && <div style={{color:"red"}}>{errorMessage?.password}</div>}
     <Password label={"Confirm Password"} id={"Confirm Password"} value={signUpForm.component} onChange={(e)=>onSignUpFormUpdate(e,'confirmPassword')}/>
     {errorMessage?.confirmPassword && <div style={{color:"red"}}>{errorMessage?.confirmPassword}</div>}
     <Button type='submit' variant='contained' sx={{marginTop:2}}>SUBMIT</Button>
     {
      errorMessage?.serverError && <div style={{color:"red"}}>{errorMessage?.serverError}</div>
     }
     
     
     
    </Box>

      


       
      </div>
    </div>
  )
}

export default Signup