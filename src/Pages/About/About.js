import React from 'react'
import './About.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
const About = () => {
  return (
    <div className='about-container'>
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
    </div>
  )
}

export default About