import React, { createContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import About from './Pages/About/About'
import Courses from './Pages/Courses/Courses'
import Contact from './Pages/Contact/Contact'
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
import { Link } from 'react-router-dom';

import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Whishlist from './Pages/whishlist/Whishlist';
import UserProfile from './Pages/UserProfile/UserProfile';
import AddAddress from './Pages/AddAddress/AddAddress';

export const Usercontext=createContext(null)
const App = () => {
  const [user,setUser]=useState(null)
  const [open, setOpen] = React.useState(false);
 const loginInitform={
    userId:"",
    password:""
  }
  const [loginForm,setLoginForm]=useState(loginInitform)
  const [loginError,setLoginError]=useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onLoginFormUpdate=(e,type)=>{
    setLoginError('')
   setLoginForm((p)=>{
    return{...p,[type]:e.target.value}
   })
  }
  
  const onLoginFormSubmit=async()=>{
   try{
   if(loginForm?.userId===''){
    return
   }
   else if(loginForm?.password===''){
   return
   }
   else if(loginForm?.userId==='' && loginForm?.password===''){
    return
   }
   else{
    const fetchDetails=await axios.post('http://localhost:8888/thirdProject/api/v1/user/signIn',
      {
      userId:loginForm?.userId,
      password:loginForm?.password
      }
    )
   const userDetails=fetchDetails?.data
   console.log(userDetails)
   setUser(userDetails)
   if(userDetails){
    alert('login successfully')
    setLoginForm(loginInitform)
    
   }
   setTimeout(()=>{
    handleClose()
   },1500)
    
  }
   }
   catch(err){
   setLoginError(err?.response?.data?.message)
   }
  }
  console.log(loginError)
  console.log(loginForm)
  console.log(user)
  return (
 <>
 <Usercontext.Provider value={user}>
   <Routes>
    <Route index element={<Navigate to="/home"/>}/>
    <Route path='/home' element={<LandingPage handleClickOpen={handleClickOpen} setUser={setUser} />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/productDetails/:productId' element={<ProductDetails/>}/>
    <Route path='/whishlist' element={<Whishlist/>}/>
    <Route path="/userProfile" element={<UserProfile/>}/>
    <Route path="/userProfile/addAddress" element={<AddAddress/>}/>
   </Routes>
</Usercontext.Provider>
   <Dialog 
        open={open}
        onClose={handleClose}
        PaperProps={{
        sx:{width:"350px",height:"300px",
          paddingLeft:"10px",
          paddingRight:"10px"
        },
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault()
            onLoginFormSubmit()
          
          },
        }}
      >
       <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Login
        </DialogTitle>
        <TextField autoFocus  id="userId" label="userId" variant="outlined"  value={loginForm.userId} className='text-field-userid' onChange={(e)=>onLoginFormUpdate(e,'userId')}/>
        <TextField   id="password" label="password" variant="outlined" value={loginForm.password} sx={{marginTop:"10px"}}  onChange={(e)=>onLoginFormUpdate(e,'password')} />
          {
            loginError && <div style={{color:"red"}}>{loginError}</div>
          }
          <DialogActions sx={{display:"flex",justifyContent:"space-between"}} >
          <Button type="submit" variant='contained'>Login</Button>
           <Typography> 
          <Typography>Not registered yet?</Typography>
          <Link to="/signUp">signup</Link>
          </Typography>
        
        
        </DialogActions>
        </Dialog>
</>
  )
}

export default App