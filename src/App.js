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
import EditAddress from './Pages/EditAddress/EditAddress';
import ReviewYourOrder from './Pages/ReviewYourOrder/ReviewYourOrder';
import PaymentSuccess from './Pages/PaymentSuccess/PaymentSuccess';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import ErrorModel from './Component/ErrorModel/ErrorModel';


export const Usercontext=createContext(null)
export const ServerErrorContext=createContext(null)
const App = () => {
  const [user,setUser]=useState(null)
  const [open, setOpen] = React.useState(false);
  const [serverError,setServerError]=useState({isError:false,errorMessage:"",errorDuration:0})
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
   //save token to local storage
   localStorage.setItem("token",userDetails.token)
   
   console.log(userDetails)
   setUser(userDetails)
   if(userDetails){
    alert('login successfully')
    setLoginForm(loginInitform)
    
   }
   setTimeout(()=>{
    handleClose()
   },1000)
    
  }
   }
   catch(err){
   setLoginError(err?.response?.data?.message)
   }
  }
  React.useEffect(()=>{
  let token=localStorage.getItem('token')
  const autoLogin=async()=>{
    try{
    const userDetails=await axios.get(`http://localhost:8888/thirdProject/api/v1/user/autoSignIn/${token}`)
   const userResultantData=userDetails.data;
   setUser(userResultantData)
    }
    catch(e){
  console.log(e)
    }
  }
  autoLogin()
  },[])
  console.log(serverError)
  console.log(loginForm)

  console.log(user)
  return (
 <div className='dark app'>
 <ServerErrorContext.Provider value={{setServerError}}>
 <Usercontext.Provider value={user}>
<>
  {serverError?.isError &&  <ErrorModel isError={serverError?.isError}
   errorMessage={serverError?.errorMessage}
    errorDuration={serverError?.errorDuration}
    onAlertClose={()=>setServerError({isError:false,errorMessage:"",errorDuration:0})} />}
</>
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
    <Route path="/userProfile" element={<PrivateRoutes><UserProfile/></PrivateRoutes>}/>
    <Route path="/userProfile/addAddress" element={<AddAddress/>}/>
    <Route path="/userProfile/editAddress" element={<EditAddress/>}/>
    <Route path="/reviewYourOrder" element={<PrivateRoutes><ReviewYourOrder/></PrivateRoutes>}/>
    <Route path="/home/payment/success/:paymentId" element={<PaymentSuccess/>} />
    <Route path="/orders" element={<OrderDetails/>}/>
   </Routes>

</Usercontext.Provider>
</ServerErrorContext.Provider>
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
</div>
  )
}

export default App