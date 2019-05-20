import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router';
const styles = {
  card: {
    maxWidth: 500,
    minWidth: 220,
    margin: "10px auto",
  },
  media: {
    height: 140,
  },
};

class MediaCard extends React.Component {
    constructor(props){
        super(props)
        this.addCart = this.addCart.bind(this);
    }
    addCart = (id, type) => {
        // console.log("id",id)
        if(type && type == 'buy'){
          let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
          cartItems[id] = {noOfItems: 1}
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          this.props.history.push('/checkout');
        }
        else{
          let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
          cartItems[id] = {noOfItems: 1}
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          this.props.history.push(`viewCart`)
        }
        
    }
render(){
  const { classes } = this.props;
  const {props} = this;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.cardDetails.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardDetails.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Rs.{props.cardDetails.price}
          </Typography>
          {/* <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions className="card-buttons">
        <Button size="small" color="primary" onClick={()=>{this.addCart(props.cardDetails.id, 'buy')}}>
          Buy
        </Button>
        {props.cardDetails.showkartBut && <Button size="small" color="primary" onClick={()=>{this.addCart(props.cardDetails.id)}}>
         Add to Cart
        </Button>}
      </CardActions>
    </Card>
  );
        }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardDetails: PropTypes.object
};

export default withStyles(styles)(withRouter(MediaCard));
