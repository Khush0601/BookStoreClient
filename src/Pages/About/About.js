import React from 'react'
import './About.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material';
import bookIcon from '../../Assets/bookIcon.jpg'
import Footer from '../../Component/Footer/footer';
const About = () => {
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
     <h2>About</h2>
     <hr/>
     <hr/>
    </div>
    <div className='about-desc'>
     <p>A bookstore app typically refers to a web or mobile application designed to manage a
      bookstore's online operations. It can include features for browsing and purchasing books, 
      as well as managing inventory and customer interactions.
      </p>
     <h2>User Features:</h2>
      <div class='about-card'>
      <div class='features'>
      <h4>User Features:</h4>
        <p>Browse Books: Users can browse a catalog of books, categorized by genre, author, or bestsellers.</p>
        <p>Search Functionality: Users can search for books based on titles, authors, ISBNs, or categories. </p>
        <p>Book Details: A page for each book showing details like the title, author, description, price, ratings, and availability.</p>
       <p> Book Reviews and Ratings: Users can leave reviews and ratings for books they’ve purchased or read.</p>
       
      </div>

      </div>
    </div>
   </div>
   <Footer/>
    </div>
  )
}

export default About