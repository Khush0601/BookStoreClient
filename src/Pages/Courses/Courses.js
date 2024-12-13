import React from 'react'
import './courses.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
import { useNavigate } from 'react-router';
import Footer from '../../Component/Footer/footer';
import BackButton from '../../Component/BackButton/BackButton';


const Courses = () => {
  const navigate=useNavigate()
  return (
    <div className='courses-container'>
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
         <div className='couses-header'>
         <div style={{display:"flex",alignItems:'center'}}>
         <BackButton/>
         <h3>Courses</h3>
         </div>
           <hr/>
           </div>
           <div className='courses-bg-image'>
            <div className='content'>
               <h3>Welcome to our Bookstore</h3>
               <h5>This will give you proper resources... </h5>
               <div onClick={()=>navigate('/home')}>Explore Now</div>
            </div>
            
           </div>
           <Footer/>
    </div>
  )
}

export default Courses