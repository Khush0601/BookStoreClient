import React,{useContext,   useState} from 'react'
import './LandingPage.css'
import { Alert, AppBar, Avatar, Box, Snackbar, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BookImage from '../../Assets/edumia.svg'
import bookIcon from '../../Assets/bookIcon.jpg'
import ProductCard from '../../Component/Productcard/Card';
import axios from 'axios';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ServerErrorContext, Usercontext } from '../../App';
import { deepOrange} from '@mui/material/colors';
import Footer from '../../Component/Footer/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';



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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
 
  zIndex: 2
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

const LandingPage = ({handleClickOpen,setUser,}) => {
  const {setServerError}=useContext(ServerErrorContext)
  // console.log(setServerError)
  const isMobile = useMediaQuery({ query: '(max-width: 775px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 912px) and (max-width:1245px)' })
  const isDesktop=useMediaQuery({query:'(min-width:1245px)'})
  const isSmallMobile=useMediaQuery({query:'(max-width:382px)'})
  const pages=["Home","Courses","Contact","About"]
  const[products,setProducts]=useState([])
  const user=useContext(Usercontext)
  const [openSnackbar,setOpenSnackbar]=useState(false)
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchResult,setSearchResult]=useState([])
  const [searchInput,setSearchInput]=useState('')
  const [newArrivals,setNewArrivals]=useState([])
  const navigate =useNavigate()
  

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
 
  const getproducts=async()=>{
    try{
     const fetchProducts=await axios.get('http://localhost:8888/thirdProject/api/v1/product/getProduct')
     const result=fetchProducts.data
     setProducts(result)
    
    }
    catch(e){
   setServerError({
      isError:true,
      errorMessage:e?.message,
      errorDuration:3000
    })
    }
  }
 React.useEffect(()=>{
 getproducts()
 },[])

 const handleClick=(el)=>{
  if(el==="Courses"){
    navigate("/courses")
  }
  else if(el==="Contact"){
   navigate("/contact")
  }
  else if(el==="About"){
   navigate("/about")
  }
 
  else if(el==="Home"){
   navigate('/home')
  }
  else if(el==="Login"){
    handleClickOpen()
  }
  else if(el==="LogOut"){
   onLogoutClick()
  }
 
 
 }
 
 const onLogoutClick=()=>{
  setUser(null)
  localStorage.removeItem('token')
 setOpenSnackbar(true)
 }

 
const onSearchClick = async() => {
 
  try{
       //api call 
      const searchResponse=await axios.get(`http://localhost:8888/thirdProject/api/v1/product?search=${searchInput}`)
     console.log(searchResponse?.data)
      setProducts(searchResponse?.data)
   }
  catch(e){
    setServerError({
      isError:true,
      errorMessage:'no internet',
      errorDuration:3000
    })
  }
   };
 const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
  {
    user &&<>
    <div className='user-InMobile'>
    <span>
    <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={()=>{
            navigate('/userProfile')
          }}>{user?.name.charAt(0).toUpperCase()}</Avatar>
    </span>
    <span style={{marginLeft:10}}>{user?.name.toUpperCase()}</span>
  
  </div>
  <Divider/>
    </>
  }
 
    <List>
      {["Home","Courses","Contact","About","Login","LogOut"].map((text, index) => (
       
        <ListItem key={text} disablePadding>
          <ListItemButton>
           
          <ListItemText primary={text} onClick={()=>handleClick(text)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
   
  </Box>
);

React.useEffect(()=>{
  const getNewArrivalProducts=async()=>{
   try{
  const getNewArrivals=await axios.get('http://localhost:8888/thirdProject/api/v1/product/getLatestProduct')
  const newProducts=getNewArrivals.data;
  setNewArrivals(newProducts)
 }
   catch(err){
    console.log(err)
   }
  }
  getNewArrivalProducts()
},[])
 console.log(openSnackbar)
console.log(products)
console.log(openDrawer)
console.log(searchResult)
console.log(searchInput)
console.log('newArrivals',newArrivals)
  return (
    <div className='landing-page-container'>
   <header>
     <Box>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:"white",color:"black"}} className='landing-page-header'>
         <Typography className='logo-part' component='div'>
         <Typography component='div'>
          <img src={bookIcon} alt='bookicon' width={isSmallMobile?35:50} height={isSmallMobile?35:50}/>
          </Typography>
          <Typography variant={isSmallMobile?'p':"h6"} component="div" sx={{ flexGrow: 1 }}>
           {!isSmallMobile && 'BookStore'}
          </Typography>
         </Typography>
         <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={()=>setOpenSnackbar(false)}
        >
        <Alert onClose={()=>setOpenSnackbar(false)} variant="filled" severity="success">Logout successfully</Alert>
         </Snackbar>
        {
        !isMobile &&  <Typography className='nav-part'>
         {pages.map((el,i)=>{
          return <Button key={i} sx={{color:"black"}} onClick={()=>handleClick(el)}>{el}</Button>
         })}

       
        <Search>
        <SearchIconWrapper onClick={onSearchClick}>
              <SearchIcon />
            </SearchIconWrapper>
           <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
           
        </Search>
         {
          user ? <div className='user_present'>
          <Button variant="contained" sx={{backgroundColor:"black" ,marginRight:"10px"}} onClick={onLogoutClick}>Logout</Button>
          <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={()=>{
            navigate('/userProfile')
          }}>{user?.name.charAt(0).toUpperCase()}</Avatar>
          </div>
          :  <Button variant="contained" sx={{backgroundColor:"black"}} onClick={()=>handleClickOpen()}>Login</Button>
         }
       </Typography>

        }
        {
          isMobile &&  <div style={{display:'flex',marginLeft:"5px"}}>
          <Search sx={{width:isSmallMobile?'110px':'140px', height: '40px'}}>
            <SearchIconWrapper onClick={onSearchClick}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={isSmallMobile?'se..':"search..."}
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}
            />
          </Search>
          <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList }
          </Drawer>
        </div>
        }
        </Toolbar>
      </AppBar>
    </Box>
   </header>
  
    
   <section>
     <Box className='landing-page-content'>
     <Box className='landing-page-main-content'>
     <Typography component='div'>
      <Typography variant={isMobile?'h5':'h4'} component='div'>
       Hello,welcomes here to learn
      </Typography>
      <Typography variant={isMobile?'h5':'h4'}>
       something <span style={{color:"pink"}}>new everyday!!!</span>
      </Typography>
     
     <Typography variant={isMobile?'p':'h6'} component='div' className='landing-page-content-para'>
     A bookstore is a store that sells books, and where people can buy them. 
     A used bookstore or second-hand bookshop sells and often buys used books.
      Some modern bookstore combine the books.
     </Typography>
     </Typography>
     
     </Box>
     <Box className='landing-page-image'>
      <img src={BookImage} alt='bookimg'/>
     </Box>
    </Box>
   <Box sx={{backgroundColor:"pink"}} >
   <Typography variant={isMobile?'h5':'h4'} component='div' sx={{marginBottom:1,paddingLeft:2}}>
       New Arrivals
      </Typography>
     <Typography className='landing-page-swiper' component='div'>
   {
    newArrivals.length===0?<h6>No new Books</h6>:
    <Swiper
        slidesPerView={isDesktop?3:isTablet?2:1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="swiper-landingPage"
      >
      {
        newArrivals.map((newProduct,index)=>{
          return <SwiperSlide key={newProduct?._id}>
                 <ProductCard productProps={newProduct} width={isSmallMobile?250:310} margin={isSmallMobile?0:2}
       marginTop={isSmallMobile?2.5:5} marginBottom={isSmallMobile?2.5:5} />
             </SwiperSlide>
        })
      }

      </Swiper>
   }
     </Typography>
   </Box>
    <Box className="free-offered-course">
     <Typography variant='h4'>
     Explore Our Collection
     </Typography>
     <Typography component='p'>
     A bookstore is a store that sells books, and where people can buy them. 
     A used bookstore or second-hand bookshop sells and often buys used books.
     </Typography>
     </Box>
     <div className="product-view">
      
     {/* api call hoke yhi card bnega */}
    {products.length===0?<h1>No products found</h1>
    :<>{products?.map((searchedProduct,searchedProductIndex)=>{
      return <ProductCard key={searchedProduct._id} productProps={searchedProduct} width={isSmallMobile?250:310} margin={isSmallMobile?0:2}
       marginTop={isSmallMobile?2.5:5} marginBottom={isSmallMobile?2.5:5} />
    })}</>}
     </div>
   </section>
    <footer>
       <Footer/>
    </footer>
     
    </div>
  )
}

export default LandingPage