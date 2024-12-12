import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar, Button, TextField } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
import './Contact.css'
const Contact = () => {
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
    
    <div className='contact-form-container'>
    <div className='contact-form'>
      <h1>Contact Us</h1>
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{maxWidth:360,minHeight:350}}
      // onSubmit={onSignUpformSubmit}
    >
     <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{marginTop:1.5}} />
     <TextField id="Email" label="Email" variant="outlined" fullWidth sx={{marginTop:1.5}} />
     <TextField id="mobileNo" label="Mobile No" variant="outlined" fullWidth sx={{marginTop:1.5}} />
     <TextField id="query" label="query" variant="outlined" fullWidth sx={{marginTop:1.5}} placeholder='write Your query...' />
     <Button type='submit' variant='contained' sx={{marginTop:2}}>SUBMIT</Button>
      </Box>
    </div>
    </div>
    </div>
  )
}

export default Contact