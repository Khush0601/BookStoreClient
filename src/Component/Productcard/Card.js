import React from "react"
import  './card.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from "react-router";

const ProductCard=({productProps,width=310,margin=30,marginTop=30,marginBottom=30})=>{
  
  const navigate=useNavigate()
  let price=productProps.price
  if(productProps.price==='0'){
    price='Free'
  }
  const onProductCardClick=(productProps)=>{
   let productId=productProps._id
   console.log(productId)
   navigate(`/productDetails/${productId}`)
  }
return (
    <div>
     <Card  sx={{
        width: width,
       
        boxShadow:"rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        margin:margin,
        marginTop:marginTop,
        marginBottom:marginBottom,
        padding:"5px"

        
     }}
     onClick={()=>onProductCardClick(productProps)}
      >
      <CardActionArea >
        <CardMedia
          component="img"
          height="250"
          width="250"
          image={productProps.image}
          alt="book img"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {productProps.name

          }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {productProps.shortDescription
           }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{
         display: "flex",
         justifyContent:" space-between",
         paddingLeft:"10px",
         paddingRight: "10px",
         alignItems: "center",
      }}>
       <Typography sx={{color:"green"}}>{price}</Typography>
       <Button sx={{
         color:" black",
         borderRadius: "20px",
         border: "1px solid black",
         fontSize:"10px",
         display: "flex",
         justifyContent: "center",
         alignItems:"center"
       }}>Buy Now</Button>
      </CardActions>
    </Card>
    </div>
)
}
export default ProductCard