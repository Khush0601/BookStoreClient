import React, { useState } from 'react'
import { useLocation } from 'react-router'

const EditAddress = () => {
    const data=useLocation()
    let result=data.state
    console.log(result)
   
    const [editAddress,setEditAddress]=useState(()=>result)
    console.log('editAddressDetails',editAddress)
  return (
    <div>EditAddress</div>
  )
}

export default EditAddress