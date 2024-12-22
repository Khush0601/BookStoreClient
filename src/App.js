import React, { createContext, Suspense, useState } from 'react'
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
import App_Config from './app_config/app-config';
import CircularProgress from '@mui/material/CircularProgress';
export const Usercontext=createContext(null)
export const ServerErrorContext=createContext(null)

const UserProfilelazyComponent = React.lazy(() => import('../src/Pages/UserProfile/UserProfile.js'));
const LoginLazyComponent = React.lazy(() => import('../src/Pages/Login/Login.js'));
const SignUpLazyComponent = React.lazy(() => import('../src/Pages/SignUp/Signup.js'));
const ProductDetailsLazyComponent = React.lazy(() => import('../src/Pages/ProductDetails/ProductDetails.js'));
const ContactLazyComponent = React.lazy(() => import('../src/Pages/Contact/Contact.js'));
const CoursesLazyComponent= React.lazy(() => import('../src/Pages/Courses/Courses.js'));
const AboutLazyComponent=React.lazy(() => import('../src/Pages/About/About.js'));
const AddAddressLazyComponent=React.lazy(() => import('../src/Pages/AddAddress/AddAddress.js'));
const EditAddressLazyComponent=React.lazy(() => import('../src/Pages/EditAddress/EditAddress.js'));
const ReviewYourOrderLazyComponent=React.lazy(() => import('../src/Pages/ReviewYourOrder/ReviewYourOrder.js'));
const OrderLazyComponent=React.lazy(() => import('../src/Pages/OrderDetails/OrderDetails.js'));
const PaymentSuccessLazyComponent=React.lazy(() => import('../src/Pages/PaymentSuccess/PaymentSuccess.js'));
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
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fetchDetails=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/user/signIn`,
      {
      userId:emailRegex.test(loginForm?.userId)?loginForm?.userId.toLowerCase():loginForm?.userId,
      password:loginForm?.password
      }
    )

   const userDetails=fetchDetails?.data
   //save token to local storage
   localStorage.setItem("token",userDetails.token)
   
   //console.log(userDetails)
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
    const userDetails=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/user/autoSignIn/${token}`)
   const userResultantData=userDetails.data;
   setUser(userResultantData)
    }
    catch(e){
  //console.log(e)
    }
  }
  autoLogin()
  },[])
  //console.log(serverError)
  //console.log(loginForm)

  //console.log(user)
  return (
 <div className='dark app'>
 <ServerErrorContext.Provider value={{setServerError}}>
 <Usercontext.Provider value={{user:user,setUser:setUser}}>
<>
  {serverError?.isError &&  <ErrorModel isError={serverError?.isError}
   errorMessage={serverError?.errorMessage}
    errorDuration={serverError?.errorDuration}
    onAlertClose={()=>setServerError({isError:false,errorMessage:"",errorDuration:0})} />}
</>
   <Routes>
    <Route index element={<Navigate to="/home"/>}/>
    <Route path='/home' element={<LandingPage handleClickOpen={handleClickOpen} setUser={setUser} />}/>
    <Route path='/login' element={<Suspense fallback={<CircularProgress size="3rem"/>}><LoginLazyComponent/></Suspense>}/>
    <Route path='/signUp' element={<Suspense fallback={<CircularProgress size="3rem"/>} ><SignUpLazyComponent/></Suspense>}/>
    <Route path='/about' element={<Suspense fallback={<CircularProgress size="3rem"/>}><AboutLazyComponent/></Suspense>}/>
    <Route path='/courses' element={<Suspense fallback={<CircularProgress size="3rem"/>}><CoursesLazyComponent/></Suspense>}/>
    <Route path='/contact' element={<Suspense fallback={<CircularProgress size="3rem"/>}><ContactLazyComponent/></Suspense>}/>
    <Route path='/productDetails/:productId' element={<Suspense fallback={<CircularProgress size="3rem"/>}><ProductDetailsLazyComponent/></Suspense>}/>
    <Route path='/whishlist' element={<Whishlist/>}/>
    <Route path="/userProfile" element={<Suspense fallback={<CircularProgress size="3rem"/>}><PrivateRoutes><UserProfilelazyComponent/></PrivateRoutes></Suspense>}/>
    <Route path="/userProfile/addAddress" element={<Suspense fallback={<CircularProgress size="3rem"/>}><AddAddressLazyComponent/></Suspense>}/>
    <Route path="/userProfile/editAddress" element={<Suspense fallback={<CircularProgress size="3rem"/>}><EditAddressLazyComponent/></Suspense>}/>
    <Route path="/reviewYourOrder" element={<Suspense fallback={<CircularProgress size="3rem"/>}><PrivateRoutes><ReviewYourOrderLazyComponent/></PrivateRoutes></Suspense>}/>
    <Route path="/home/payment/success/:paymentId" element={<Suspense fallback={<CircularProgress size="3rem"/>}><PaymentSuccessLazyComponent/></Suspense>} />
    <Route path="/orders" element={<Suspense fallback={<CircularProgress size="3rem"/>}><OrderLazyComponent/></Suspense>}/>
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
        <TextField autoFocus  id="userId" label="userId or email" variant="outlined"  value={loginForm.userId} className='text-field-userid' onChange={(e)=>onLoginFormUpdate(e,'userId')}/>
        <TextField   id="password" label="password" variant="outlined" value={loginForm.password} sx={{marginTop:"10px"}}  onChange={(e)=>onLoginFormUpdate(e,'password')} />
          {
            loginError && <div style={{color:"red"}}>{loginError}</div>
          }
          <DialogActions sx={{display:"flex",justifyContent:"space-between"}} >
          <Button type="submit" variant='contained'>Login</Button>
           <Typography> 
          <Typography>Not registered yet?</Typography>
          <Link to="/signUp" onClick={handleClose} style={{ color: "blue",cursor: "pointer" }}>signup</Link>
          </Typography>
        
        
        </DialogActions>
        </Dialog>
</div>
  )
}

export default App