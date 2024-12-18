import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, AppBar, Button, TextField } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
import './Contact.css'
import BackButton from '../../Component/BackButton/BackButton';
import axios from 'axios'
import { ServerErrorContext } from '../../App';
import { useNavigate } from 'react-router';
import App_Config from '../../app_config/app-config';

const Contact = () => {
  const contactDetailsObj={
    userName:"",
    email:"",
    mobile:"",
    query:""
   }
  const[contactDetails,setContactDetails]=useState(contactDetailsObj)
  const [contactResult,setContactResult]=useState('')
   const {setServerError}=useContext(ServerErrorContext)

 const onContactFormUpdate=(e,type)=>{
setContactDetails((p)=>{
  return {...p,[type]:e.target.value}
})
 }
 const navigate=useNavigate()

  const onContactFormSubmit=async(e)=>{
    e.preventDefault();
   if(!contactDetails.userName ||!contactDetails.email ||!contactDetails.mobile || !contactDetails.query){
    setServerError({
      isError:true,
      errorMessage:'please provide all the required data',
      errorDuration:3000
    })
   }
    else{
      try{
        const postContactDetails=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/contact/postContactDetails`,{
          userName:contactDetails.userName,
          email:contactDetails.email,
          mobile:contactDetails.mobile,
          query:contactDetails.query
        })
       const result=postContactDetails?.data?.message;
       setContactResult(result)
       setTimeout(()=>{
        navigate('/home')
       },2000)
        }
        catch(e){
       //console.log(e)
       setServerError({
        isError:true,
        errorMessage:e?.message,
        errorDuration:3000
      })
        }
    }
   
  }
  //console.log(contactDetails)
  //console.log(contactResult)
  return (
    <div  className='contact-cont'>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{bgcolor:'white'}}>
         <Typography>
          <img src={bookIcon} alt='bookicon' width={50} height={50}/>
          </Typography>
          <Typography variant="h6" component="div"  sx={{ flexGrow: 1,color:"black" }}>
            Bookstore
          </Typography>
         </Toolbar>
      </AppBar>
    </Box>
     {contactResult ==='your query submitted successfully' && <div className='contact-result'>
      <Alert variant="filled" severity="success">
       {contactResult}
      </Alert>
     </div>}
    <div className='contact-form-container'>
    <div className='contact-form'>
      <div style={{display:'flex',alignItems:"center"}}>
      <BackButton/>
      <h1>Contact Us</h1>
      </div>
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{maxWidth:360,minHeight:350}}
      onSubmit={onContactFormSubmit}
    >
     <TextField id="userName" label="Name" variant="outlined" fullWidth sx={{marginTop:1.5}} value={contactDetails.userName} required onChange={(e)=>onContactFormUpdate(e,'userName')} />
     <TextField id="email" label="Email" variant="outlined" fullWidth sx={{marginTop:1.5}} value={contactDetails.email} required onChange={(e)=>onContactFormUpdate(e,'email')} />
     <TextField id="mobile" label="Mobile No" variant="outlined" fullWidth sx={{marginTop:1.5}}  required value={contactDetails.mobile} onChange={(e)=>onContactFormUpdate(e,'mobile')}/>
     <TextField id="query" label="query" variant="outlined" fullWidth sx={{marginTop:1.5}} required placeholder='write Your query...' value={contactDetails.query}  onChange={(e)=>onContactFormUpdate(e,'query')} />
     <Button type='submit' variant='contained' sx={{marginTop:2}}>SUBMIT</Button>
      </Box>
    </div>
    </div>
    </div>
  )
}

export default Contact