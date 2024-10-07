import React from "react"
import './card.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import bookImg from '../../Assets/edumia.svg'
const ProductCard=()=>{
return (
    <div >
         <Card  className="card-cont" sx={{maxWidth: 310}} >
      <CardActionArea >
        <CardMedia
          component="img"
          height="250"
          width="250"
          image={bookImg}
          alt="book img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Drama Book
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           this is all about this drama
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
       <Typography>Price</Typography>
       <Button className="buy-now">Buy Now</Button>
      </CardActions>
    </Card>
    </div>
)
}
export default ProductCard