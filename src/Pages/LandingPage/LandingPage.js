import React from 'react'
import './LandingPage.css'
import { AppBar, Box, TextField, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BookImage from '../../Assets/edumia.svg'
import bookIcon from '../../Assets/bookIcon.jpg'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const LandingPage = () => {
  const pages=["Home","Courses","Contact","About"]
  return (
    <div className='landing-page-container'>
    <Box >
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:"white",color:"black"}} className='landing-page-header'>
         <Typography className='logo-part'>
         <Typography >
          <img src={bookIcon} alt='bookicon' width={50} height={50}/>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookstore
          </Typography>
         </Typography>
         <Typography className='nav-part'>
         {pages.map((el,i)=>{
          return <Button key={i} sx={{color:"black"}}>{el}</Button>
         })}

       
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button variant="contained" sx={{backgroundColor:"black"}}>Login</Button>
       </Typography>

        
        </Toolbar>
      </AppBar>
    </Box>
    <Box className='landing-page-content'>
     <Box className='landing-page-main-content'>
     <Typography variant='h2'>
      <Typography variant='h3'>
       Hello,welcomes here to learn
      </Typography>
      <Typography variant='h3'>
       something <span style={{color:"pink"}}>new everyday!!!</span>
      </Typography>
     
     <Typography variant='h5' component='div' className='landing-page-content-para'>
     A bookstore is a store that sells books, and where people can buy them. 
     A used bookstore or second-hand bookshop sells and often buys used books.
      Some modern bookstore combine the books.
     </Typography>
     <Typography className='landing-page-emailBox'>
     <TextField inputProps={{style:{height:"15px"}}} fullWidth label="Email" id="fullWidth" />
    
     </Typography>
     </Typography>
     </Box>
     <Box className='landing-page-image'>
      <img src={BookImage} alt='bookimg' width={400} height={400}/>
     </Box>
    </Box>
    </div>
  )
}

export default LandingPage