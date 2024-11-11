import React, { useContext, useState } from 'react'
import './ProductDetails.css'

import { useParams } from 'react-router'
import axios from 'axios'
import {   Avatar, Box, Button, FormControl, FormLabel, TextField } from '@mui/material'
import { Usercontext } from '../../App';
const ProductDetails = () => {
  const user=useContext(Usercontext)
  const params=useParams()
  console.log(params)

  const[petFulldetals,setPetFullDetails]=useState({})

  const[reviewField,setReviewField]=useState({
    userName:"",
    userId:"",
    userImage:"",
    productId:"",
    message:""
  })
  const[reviewResult,setReviewResult]=useState([])

  React.useEffect(()=>{
    const fetchPetDetailsById=async()=>{
      try{
    const pet=await axios.get(`http://localhost:8888/thirdProject/api/v1/product/${params.productId}`)
    const petResponse=pet.data
    // console.log(petResponse)
    setPetFullDetails(petResponse)
      }
      catch(e){
        console.log(e.message)
       
      }
    }
    fetchPetDetailsById()
  },[params.productId])
  
  React.useEffect(()=>{
  setReviewField((p)=>{
    return{...p,
      userName:user?.name,
      userId:user?._id,
      userImage:user?.userImage,
      productId:params.productId,
  }
    
  })
  },[user,params?.productId])

const onReviewFieldUpdate=(e)=>{
  setReviewField((p)=>{
    return {...p,message:e.target.value}
  })
  }
  
  const onReviewFormSubmit=async(e)=>{
   e.preventDefault()
   try{
    const sendReviewDetails=await axios.post('http://localhost:8888/thirdProject/api/v1/productReview/addReview',{
      userName:reviewField.userName,
      userId:reviewField?.userId,
      userIamge:reviewField?.userImage,
      productId:reviewField?.productId,
      reviewMessage:reviewField?.message
    })
    setReviewResult((p)=>{
      return[...p,sendReviewDetails.data]
    })
    setReviewField({
      userName:"",
      userId:"",
      userIamge:"",
      productId:"",
      message:""
    })
   }
   catch(e){
  console.log(e?.response?.statusText)

   }
   
  
  }
  console.log(reviewResult)
  console.log(user)
  console.log(reviewField)
  // console.log(petFulldetals)
  return (
    <div className='productDetails-container'>
       <div className='productDetails-box'>
      
          <div className='productImg'>
            <img src={petFulldetals?.image} alt={petFulldetals?.name}/>
          </div>
          <div className='productRestDetails'>
            <div className='product-name'>
                <h2>{petFulldetals?.name}</h2>
            </div>
            <div className='product-short-desc'>
                <p>{petFulldetals?.shortDescription}</p>
            </div>
            <div className='product-autor'>
              <h5>author:</h5>
              <span>{petFulldetals?.author}</span>
            </div>
            <div className='product-price'>
                <h5>price:</h5>
                <span>{petFulldetals?.price}</span>
            </div>
            <div className='product-stock-count-and-type'>
                <div className='in-stock'>
                    <h6>In stock:</h6>
                    <span>{petFulldetals?.bookAvailable}</span>
                </div>
                <div className='type'>
                    <div>{petFulldetals?.type}</div>
                </div>
            </div>
            <div className='product-desc'>
                <h4>Product Description</h4>
                <p>{petFulldetals?.description}</p>
            </div>
            <div className='product-rating'>
                <h4>Ratings:</h4>
                <span>{petFulldetals?.rating}</span>
            </div>
           
           
          </div>
       </div>
       <div className='product-reviews'>
              <div className='product-review-form-part'>
              <h4>Review:</h4>
              <div className='product-review-form'>
              <FormControl component="form" onSubmit={onReviewFormSubmit} sx={{ width: '100%'}}>
              <FormLabel sx={{ mb: 1, fontSize: '1rem' }}>write your reviw here...</FormLabel>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
             {reviewField?.userImage!==undefined? <Avatar sx={{ bgcolor: 'primary.main', mr: 1, my: 0.5, fontSize: 20 }}>
             {reviewField?.userImage}
             </Avatar>:
             <Avatar sx={{ bgcolor: 'primary.main', mr: 1, my: 0.5, fontSize: 20 }}>
             {reviewField?.userName?.charAt(0).toUpperCase()}
              </Avatar>}
              <TextField id="input-with-sx" label={reviewField?.userName} variant="standard" value={reviewField.message} multiline onChange={(e)=>onReviewFieldUpdate(e)}/>
             <Button type={user?'submit':"button"} variant="contained" color="primary" sx={{ mt: 1 }} disabled={!user}>
              Submit
             </Button>
              </Box>
              </FormControl>
              </div>
              </div>
              <div>{reviewResult?.map((el,i)=>{
                return <div>
                  <div>{el?.userName}</div>
                  <div>{el?.message}</div>
                </div>
              })}</div>
             </div>
             
             
           
    </div>
  )
}

export default ProductDetails