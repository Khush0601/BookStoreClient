import { Skeleton } from '@mui/material'
import React from 'react'

const CardSkeleton = () => {
  return (
    <div style={{height:'450px',border:'0.24px solid lightGray',padding:'10px',borderRadius:"10px"}}>
        <Skeleton variant="rectangular" width={250} height={250} />
        <Skeleton sx={{marginTop:1}} variant="rectangular" width={250} height={40} />
        <Skeleton sx={{marginTop:1}} variant="rectangular" width={250} height={40} />
        <div style={{display:"flex",justifyContent:'space-between',alignItems:"center" ,marginTop:"20px"}}>
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
        </div>
    </div>
  )
}

export default CardSkeleton