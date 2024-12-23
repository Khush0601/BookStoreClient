import React, { useContext, useState } from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router'
import axios from 'axios'
import {  Avatar, Box, Button, FormControl, FormLabel,  TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { ServerErrorContext, Usercontext } from '../../App';
import Footer from '../../Component/Footer/footer'
import { useNavigate } from 'react-router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from 'react-router-dom'
import App_Config from '../../app_config/app-config'
const ProductDetails = () => {
  const {user}=useContext(Usercontext)
  const {setServerError}=useContext(ServerErrorContext)
  const params=useParams()
  console.log(user)
 const navigate=useNavigate()
  const[bookFulldetals,setBookFullDetails]=useState({})
 const[reviewField,setReviewField]=useState({
    userName:"",
    userId:"",
    userImage:"",
    productId:"",
    message:""
  })
  const [ratingValues,setRatingValues]=useState({
    userName:"",
    userId:"",
    ratingCount:0,
    productId:""

  })
  
  const[reviewResult,setReviewResult]=useState([])
  const[ratingResult,setRatingResult]=useState(0)

  React.useEffect(()=>{
    const fetchBookDetailsById=async()=>{
      try{
    const book=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/product/${params.productId}`)
    const bookResponse=book.data
    // //console.log(petResponse)
    setBookFullDetails(bookResponse)
      }
      catch(e){
       
        setServerError({
          isError:true,
          errorMessage:e?.response?.statusText??e?.message,
          errorDuration:3000
        })
       }
    }
    fetchBookDetailsById()
  },[params.productId])
  
  React.useEffect(()=>{
    const getAllReviews=async()=>{
      try{
      const reviews=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/productReview/${params.productId}/getReview`)
      const reviewResponse=reviews.data
      setReviewResult(reviewResponse)
      }
      catch(e){
       //console.log(e?.message)
      }
    }
    if(params?.productId) {
      getAllReviews();
    }
  
  },[params?.productId])

 React.useEffect(()=>{
  const getAllRating=async()=>{
  try{
   const rating=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/productRating/${params.productId}/getRating`)
   const ratingResponse=rating?.data
   setRatingResult(ratingResponse)

  }
  catch(e){
    //console.log(e?.message)
    setServerError({
      isError:true,
      errorMessage:e?.message,
      errorDuration:3000
    })
    }
   }
   if(params?.productId){
    getAllRating()
   }
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
 
  React.useEffect(()=>{
    setRatingValues((p)=>{
    return {...p,
           userName:user?.name,
           userId:user?._id,
           productId:params?.productId,
           }
     })
    },[params?.productId,user])

const onRatingValueUpdate=(e)=>{
  setRatingValues((p)=>{
  return {...p,ratingCount:Number(e.target.value)}
})
}

const onRatingSubmit=async()=>{
  
try{
 const sendRatingDetails=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/productRating/addRating`,{
  userName:ratingValues?.userName,
  userId:ratingValues?.userId,
  ratingCount:ratingValues?.ratingCount,
  productId:ratingValues?.productId
 })
  console.log(sendRatingDetails)
 
}
catch(e){
  //console.log(e?.response?.statusText)
  setServerError({
          isError:true,
          errorMessage:e?.response?.statusText,
          errorDuration:3000
        })
 
}
}

const onReviewFieldUpdate=(e)=>{
  setReviewField((p)=>{
    return {...p,message:e.target.value}
  })
  }
  
  const onReviewFormSubmit=async(e)=>{
   e.preventDefault()
   if(reviewField?.message===''){
    return
   }
   try{
    const sendReviewDetails=await axios.post(`${App_Config.server_url}/thirdProject/api/v1/productReview/addReview`,{
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
  //console.log(e?.response?.statusText)
   setServerError({
          isError:true,
          errorMessage:e?.response?.statusText,
          errorDuration:3000
        })

   }
   
  
  }
  


  //console.log(reviewResult)
  console.log(ratingValues)
  //console.log(user)
  //console.log(ratingResult)
  //console.log(reviewField)
  //console.log(bookFulldetals)
 
  return (
    <div className='productDetails-container'>
       <div className='productDetails-box'>
       <div onClick={()=>navigate(-1)}><KeyboardBackspaceIcon/></div>
          <div className='productImg'>
            <img src={bookFulldetals?.image} alt={bookFulldetals?.name}/>
         
          </div>
          <div className='productRestDetails'>
            <div className='product-name'>
                <h2>{bookFulldetals?.name}</h2>
            </div>
            <div className='product-short-desc'>
                <p>{bookFulldetals?.shortDescription}</p>
            </div>
            <div className='product-autor'>
              <h5>author:</h5>
              <span>{bookFulldetals?.author}</span>
            </div>
            <div className='product-price'>
                <h5>price:</h5>
                <span>{bookFulldetals?.price}</span>
            </div>
            <div className='product-stock-count-and-type'>
                <div className='in-stock'>
                    <h6>In stock:</h6>
                    <span>{bookFulldetals?.bookAvailable}</span>
                </div>
                <div className='type'>
                    <div>{bookFulldetals?.type}</div>
                </div>
            </div>
            <div className='product-desc'>
                <h4>Product Description</h4>
                <p>{bookFulldetals?.description}</p>
            </div>
            <div className='product-rating'>
               <div>
               <h4>Ratings:</h4>
              {
                user && <div>
              <select value={ratingValues?.ratingCount} onChange={(e)=>onRatingValueUpdate(e)} >
                <option value={0} disabled>Rate here</option>
                <option value={1} >1</option>
                <option value={2} >2</option>
                <option value={3} >3</option>
                <option value={4} >4</option>
                <option value={5} >5</option>
                </select>
                <Button type='button' onClick={onRatingSubmit}><SendIcon/></Button>
              </div>
              }
               <span>{ratingResult?.averageValue==='N/A'?'N/A':ratingResult?.averageValue?.toFixed(2)}</span>
               </div>
               <div className='buy-now-button'>
               <NavLink state={bookFulldetals} to="/reviewYourOrder"><Button variant="contained" >Buy Now</Button></NavLink>
          </div>

            </div>
           
          
          </div>
       </div>
       <div className='product-reviews'>
              <div className='product-review-form-part'>
              <h4>Review:</h4>
              <div className='product-review-form'>
              <FormControl component="form" onSubmit={onReviewFormSubmit} sx={{ width: '100%'}}>
              <FormLabel sx={{ mb: 1, fontSize: '1rem' }}>write your review here...</FormLabel>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
             {reviewField?.userImage!==undefined?<Avatar sx={{ bgcolor: 'primary.main', mr: 1, my: 0.5, fontSize: 20 }}>
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
              <div>
              {reviewResult.length===0? <h3 style={{margin:'10px'}}>No reviews yet</h3> :reviewResult?.map((el,i)=>{
                return <div key ={i} className='review-msg-container'>
                <div className='review-msg-name'>
                {!el.userImage}{
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1, my: 0.5, fontSize: 20 }}>
             {el?.userName?.charAt(0).toUpperCase()}
              </Avatar>
              }
              <div>{el?.userName.toUpperCase()}</div>
              </div>
              <div>{el?.reviewMessage}</div>
              </div>
              })} 
              </div>
             
             </div>
            
             
             <Footer/> 
    </div>
  )
}

export default ProductDetails