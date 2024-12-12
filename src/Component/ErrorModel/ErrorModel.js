import { Alert } from '@mui/material'
import React, { useState } from 'react'
import './errorModel.css'
const ErrorModel = ({isError,errorMessage='something went wrong',errorDuration,onAlertClose}) => {
    const [error,setError]=useState(false)
    // console.log(errorDuration)
    
    const clearAlert=React.useCallback(()=>{
        setTimeout(()=>{
          setError(false)
          onAlertClose()
         },errorDuration)
       },[errorDuration])

       
    React.useEffect(()=>{
        console.log(isError,'heelo')
     if(isError===true){
        console.log("hello")
        setError(isError)
        clearAlert()
     }
     
    },[isError,clearAlert,errorMessage])

    
   
  return (
    <div className='error-block'>
        {
        error? <Alert variant="filled" severity="error"  onClose={() => {
            setError(false)
            onAlertClose()
            }}>
        {errorMessage}
      </Alert>:<div></div>
    }
    </div>
  )
}

export default ErrorModel