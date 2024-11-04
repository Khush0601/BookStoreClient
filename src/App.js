import React from 'react'
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
const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
 <>
   <Routes>
    <Route index element={<Navigate to="/home"/>}/>
    <Route path='/home' element={<LandingPage handleClickOpen={handleClickOpen}/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/contact' element={<Contact/>}/>

   </Routes>

   <Dialog 
        open={open}
        onClose={handleClose}
        PaperProps={{
        sx:{width:"350px",height:"300px",
          paddingLeft:"10px",
          paddingRight:"10px"
        },
          component: 'form',
          onSubmit: () => {
           handleClose();
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Login
        </DialogTitle>
        <TextField autoFocus  required id="userId" label="userId" variant="outlined" className='text-field-userid' />
        <TextField  required id="password" label="password" variant="outlined" sx={{marginTop:"10px"}} />
           <DialogActions sx={{display:"flex",justifyContent:"space-between"}} >
          {/* <Button onClick={handleClose}>Cancel</Button> */}
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