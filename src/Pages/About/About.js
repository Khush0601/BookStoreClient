import React, { useContext, useState } from 'react'
import './About.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
import Footer from '../../Component/Footer/footer';
import TestmonialCard from '../../Component/TestimonailsCard/TestmonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { ServerErrorContext } from '../../App';
import App_Config from '../../app_config/app-config';
import BackButton from '../../Component/BackButton/BackButton';

const About = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 912px) and (max-width:1245px)' })
  
 const {setServerError}=useContext(ServerErrorContext)
  const isDesktop=useMediaQuery({query:'(min-width:1245px)'})
  //console.log(isDesktop)
  const [testimonialDatas,setTestimonialDatas]=useState([])
  React.useEffect(()=>{
   const getTestimonialData=async()=>{
    try{
    const testimonialData=await axios.get(`${App_Config.server_url}/thirdProject/api/v1/testimonial/getTestimonial`)
    setTestimonialDatas(testimonialData?.data)
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
   getTestimonialData()
  },[])
 const [deviceWidth,setdeviceWidth]=useState(window.innerWidth)
  React.useEffect(()=>{
let resizeListener=window.addEventListener('resize',()=>{
    setdeviceWidth(window.innerWidth)
 })
   return ()=>window.removeEventListener('resize',resizeListener)
  },[])
  //console.log('testimonialData',testimonialDatas)
  return (
    <div className='about-container'>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{bgcolor:'white'}}>
         <Typography>
          <img src={bookIcon} alt='bookicon' width={50} height={50}/>
          </Typography>
          <Typography variant="h6" component="div"  sx={{ flexGrow: 1,color:"black" }}>
            Bookstore
          </Typography>
         </Toolbar>
      </AppBar>
    </Box>
   <div className='about-content'>
   <div className='header'>
   <div style={{display:"flex"}}>
     <BackButton/>
    <h2>About</h2>
   </div>
     <hr/>
     <hr/>
    </div>
    <div className='about-desc'>
     <p>A bookstore app typically refers to a web or mobile application designed to manage a
      bookstore's online operations. It can include features for browsing and purchasing books, 
      as well as managing inventory and customer interactions.
      </p>
     <h2>User Features:</h2>
      <div className='about-card'>
      <div className='features'>
      <h4>User Features:</h4>
       <ol style={{marginLeft:10}}>
       <li>Browse Books: Users can browse a catalog of books, categorized by genre, author, or bestsellers.</li>
       <li>Search Functionality: Users can search for books based on titles, authors, ISBNs, or categories. </li>
       <li>Book Details: A page for each book showing details like the title, author, description, price, ratings, and availability.</li>
       <li>Book Reviews and Ratings: Users can leave reviews and ratings for books they’ve purchased or read.</li>
       <li>Auto-login/Logout: Users can automatically log in or log out based on their session state.</li>
       <li>Buy Books: Users can purchase books and proceed to the checkout process seamlessly.</li>
       <li>Add Address: Users can add new shipping addresses for their orders.</li>
       <li>Set Default Address: Users can mark an address as their default for quicker checkout.</li>
       <li>Update/Change Address: Users can edit or change their saved addresses.</li>
       <li>View Orders: Users can view a list of their past and current orders along with details.</li>
       
      </ol>
       
      </div>

      </div>
    </div>
    <div className='testimonials-container'>
      <h1>Testimonials</h1>
      <div className='testimonial-cards'>
      {
      testimonialDatas?.length===0? <h3>No Datas Added</h3>:
      <Swiper
        slidesPerView={isDesktop?3:isTablet?2:1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="about-swiper"
      >
        {
          testimonialDatas.map((testimonialDetails,index)=>{
        return <SwiperSlide className='about-swiper-slide' key={testimonialDetails?.userId}>
                 <div className='swiper-container'> <TestmonialCard testimonialDetails={testimonialDetails} width={isDesktop?(deviceWidth-80)/3:isTablet?(deviceWidth-80)/2:deviceWidth-110} /></div>
             </SwiperSlide>
      }) }
      </Swiper>
      
     }
      </div>
    </div>
  
    
    <div>
     
    </div>
   </div>
   <Footer/>
    </div>
  )
}

export default About