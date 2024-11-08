import React, { useState } from 'react'
import './ProductDetails.css'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router'
import axios from 'axios'
import {  Avatar, Box, Button, FormControl, FormLabel, TextField } from '@mui/material'
const ProductDetails = () => {
  
  const params=useParams()
  console.log(params)
  const[petFulldetals,setPetFullDetails]=useState({})
  const[reviewForm,setReviewForm]=useState('')

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
  
  const onReviewFormUpdate=(e)=>{
   setReviewForm(e.target.value)
  }
  const onReviewFormSubmit=(e)=>{
   e.preventDefault()
   console.log("submitted")
   setReviewForm('')
  }
  console.log(reviewForm)
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
              <Avatar sx={{ bgcolor: 'primary.main', mr: 1, my: 0.5, fontSize: 20 }}>
          {/* {firstLetter} */}
        </Avatar>
              <TextField id="input-with-sx" label={petFulldetals?.name} variant="standard" value={reviewForm} multiline onChange={(e)=>onReviewFormUpdate(e)} />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
              Submit
             </Button>
              </Box>
              </FormControl>
              </div>
              </div>
              <div>hiiii</div>
           
             
              </div>
             
             
           
    </div>
  )
}

export default ProductDetails