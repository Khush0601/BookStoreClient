import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router';

const BackButton = () => {
     const naivgate=useNavigate()
  return (
    <div onClick={()=>naivgate(-1)} style={{marginRight:5}}><KeyboardBackspaceIcon/></div>
  )
}

export default BackButton