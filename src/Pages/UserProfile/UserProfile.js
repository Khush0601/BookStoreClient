import React, { useContext } from 'react'
import './UserProfile.css'
import { Usercontext } from '../../App'
import { deepOrange } from '@mui/material/colors';
import { Avatar, Button, Divider} from '@mui/material';
import { useNavigate } from 'react-router';
const UserProfile = () => {
    const user=useContext(Usercontext)
    console.log(user)
    const navigate =useNavigate()
  return (
    <div className='user-profile-container'>
      <div className='user-profile-box'>
         <div className='user-part'>
           <div className='user-avatar'>
           <Avatar sx={{ bgcolor: deepOrange[500], width: 50,height:50, }}>N</Avatar>
           </div>
           <div className='user-details'>
             <div>khushboo singh</div>
             <div>ksunghjnbh</div>
           </div>
          
         </div>
         <Divider/>
        <div className='user-address-part'>
         <h4>Address</h4>
         <Divider/>
         <div className='buttons'>
          <Button variant="contained" sx={{marginRight:2}} onClick={()=>navigate('/userProfile/addAddress')}>Add </Button>
         <Button variant="contained">Edit</Button>
         </div>
        </div>
      </div>
       
    </div>
   
  )
}

export default UserProfile

