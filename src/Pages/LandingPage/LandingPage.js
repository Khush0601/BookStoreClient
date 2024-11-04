import React,{useState} from 'react'
import './LandingPage.css'
import { AppBar, Box, TextField, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BookImage from '../../Assets/edumia.svg'
import bookIcon from '../../Assets/bookIcon.jpg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ProductCard from '../../Component/Productcard/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

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
  const isMobile = useMediaQuery({ query: '(max-width: 775px)' })
  const pages=["Home","Courses","Contact","About"]
  const[products,setProducts]=useState([])
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate =useNavigate()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getproducts=async()=>{
    try{
     const fetchProducts=await axios.get('http://localhost:8888/thirdProject/api/v1/product/getProduct')
     const result=fetchProducts.data
     setProducts(result)
    
    }
    catch(e){
    console.log(e.message)
    }
  }
 React.useEffect(()=>{
 getproducts()
 },[])
 const handleClick=(el)=>{
  if(el==='Courses'){
    navigate("/courses")
  }
  else if(el==='Contact'){
   navigate("/contact")
  }
  else if(el==='About'){
   navigate("/about")
  }
 
  else if(el==='Home'){
   navigate('/home')
  }
 }
 const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {['Home','Courses','Contact','About','Login'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
           
            <ListItemText primary={text} onClick={(el)=>handleClick(text)}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
   
  </Box>
);

console.log(products)
console.log(openDrawer)
  return (
    <div className='landing-page-container'>
    <Box>
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
        {
        !isMobile &&  <Typography className='nav-part'>
         {pages.map((el,i)=>{
          return <Button key={i} sx={{color:"black"}} onClick={()=>handleClick(el)}>{el}</Button>
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
          <Button variant="contained" sx={{backgroundColor:"black"}} onClick={handleClickOpen}>Login</Button>
       </Typography>

        }
        {
          isMobile &&  <div>
          <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList }
          </Drawer>
        </div>
        }
        </Toolbar>
      </AppBar>
    </Box>
    <Box className='landing-page-content'>
     <Box className='landing-page-main-content'>
     <Typography  >
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
    <Box className="free-offered-course">
     <Typography variant='h5'>
      Free offered Courses
     </Typography>
     <Typography component='p'>
     A bookstore is a store that sells books, and where people can buy them. 
     A used bookstore or second-hand bookshop sells and often buys used books.
     </Typography>
     </Box>
     <div className="product-view">
      {products.map((product,productIndex)=>{
         return <ProductCard key={product._id} productProps={product}/>
      })}
     {/* api call hoke yhi card bnega */}
     </div>
     <Dialog 
        open={open}
        onClose={handleClose}
        PaperProps={{
        sx:{width:"350px",height:"300px",
          paddingLeft:"10px",
          paddingRight:"10px"
        },
          component: 'form',
          onSubmit: () => {
           handleClose();
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Login
        </DialogTitle>
        <TextField autoFocus  required id="userId" label="userId" variant="outlined" className='text-field-userid' />
        <TextField  required id="password" label="password" variant="outlined" sx={{marginTop:"10px"}} />
           <DialogActions sx={{display:"flex",justifyContent:"space-between"}} >
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button type="submit" variant='contained'>Login</Button>
          <Typography> 
          <Typography>Not registered yet?</Typography>
          <Link path='/signUp'>signup</Link>
          </Typography>
        
        
        </DialogActions>
        </Dialog>
    </div>
  )
}

export default LandingPage