import { Box, Typography } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <div>
    <Box sx={{textAlign:'center',bgcolor:'black',color:'white',padding:10,marginTop:20}}>
         <Box  className="" sx={{cursor:'pointer', display:"flex" ,justifyContent:"center",gap:"10px"}} >
           <InstagramIcon/>
           <TwitterIcon/>
           <GitHubIcon/>
           <YouTubeIcon/>
          </Box>
           <Typography variant='h5' >
           
           All rights reserved under @bookstore.com
            </Typography>
        </Box>
        
    </div>
  )
}

export default Footer