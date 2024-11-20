import React, { useContext } from 'react'
import './UserProfile.css'
import { deepOrange } from '@mui/material/colors'
import { Avatar, TextField } from '@mui/material'
import { Usercontext } from '../../App'
const UserProfile = () => {
    const user=useContext(Usercontext)
    console.log(user)

  return (
    <div className='user-profile-container'>
      <div className='user-profile-box'>
          <div className='user-profile-avtar'>
          <Avatar sx={{ bgcolor: deepOrange[500],width: 60,height: 60 }}>{user?.name.charAt(0).toUpperCase()}</Avatar>
          </div>
          <TextField id="Name" label="name" variant="outlined" fullWidth sx={{marginTop:2}}
           defaultValue={
          user?.name? user.name.charAt(0).toUpperCase().concat(user.name.slice(1)): ""
          } 
          />
          <TextField id="Email" label="Email" variant="outlined" fullWidth sx={{marginTop:2}}
            defaultValue={user?.email? user.email:""}
          />
          <TextField id="street" label="street" variant="outlined" fullWidth sx={{marginTop:2}}/>
          <TextField id="city" label="city" variant="outlined" fullWidth sx={{marginTop:2}}/>
          <TextField id="state" label="state" variant="outlined" fullWidth sx={{marginTop:2}}/>
          <TextField id="pincode" label="pincode" variant="outlined" fullWidth sx={{marginTop:2}}/>
        </div>
       {/* <div className='user-profile-name-section'>
          <h4>Name</h4>
          <div className='box'>{user?.name.charAt(0).toUpperCase().concat(user.name.slice(1))}</div>
          </div>
          <div className='user-profile-email-section'>
          <h4>Email</h4>
          <div className='box'>{user?.email}</div>
          </div>
          <div className='user-profile-userId-section'>
          <h4>UserId</h4>
          <div className='box'>{user?.userId}</div>
          </div> */}
    </div>
  )
}

export default UserProfile

