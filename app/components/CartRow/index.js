import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCartData } from './../../containers/Cart/selectors';
import { storeCartData } from './../../containers/Cart/actions';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
const styles = {
  card: {
    maxWidth: "90%",
    minWidth: 220,
    margin: "10px auto",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 140,
  },
  colum: {
    display: 'flex',
    flexDirection: 'row',
  }
};

class CartRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartDetails: [],
      quantity: this.props.cartDetails.quantity,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    // console.log("next")
    this.setState({quantity: nextProps.cartDetails.quantity})
  }
  componentDidMount() {


  }

  getPrice = () => {
    return Number(this.state.quantity) * this.props.cartDetails.price;
  }

  changeQuntity = (type) => {
    let { quantity } = this.state;
    if (type === 'dec' ) {
      quantity = quantity - 1;
      this.setState({ quantity });
    }
    else if (type === 'inc') {
      quantity = quantity + 1;
      this.setState({ quantity });
    }
    let cartItems = localStorage.getItem('cartItems') && JSON.parse(localStorage.getItem('cartItems'));
    cartItems[this.props.cartDetails.id]['noOfItems'] = quantity;
    console.log(this.props.cartDetails.id, this.props.cartDetails)
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.props.renderCard();
    // this.props.storeCartData(cartItems);
  }
  render() {
    const { classes } = this.props;
    const {props} = this;
    console.log(props)
    return (
      // <Card className={classes.card}>
      //   <div className={classes.details}>
      //       <img src={this.props.cartDetails.url} className="product-img" />
      //       {props.cartDetails.name}
      //       {/* <div className="cart-row-col qty-div"> */}
      //       </div>
      //       <div className={classes.colum}>
      //         <span onClick={() => { this.changeQuntity('dec') }} className="inc-dec">-</span>
      //         {this.state.quantity}
      //         <span onClick={() => { this.changeQuntity('inc') }} className="inc-dec">+</span>
      //         </div>
      //       {/* </span> */}
      //       <div className={classes.colum}>
      //       <span className="cart-row-col">{this.getPrice()}</span>
      //       </div>
      // </Card>
      <div>
      {/* {this.props.cartDetails.quantity >= 1 ?  */}
        <div className="cart-row-div">
        <div className={props.checkout ? "cart-row-col prod-name checkout-prod-name" : "cart-row-col prod-name"}>
          <div className="cart-img-div"><img src={this.props.cartDetails.url} className={props.checkout ? `product-img checkout-img` : `product-img`}/></div>
          <div className="prod-title">{this.props.cartDetails.name}</div>
        </div>
        <div className="cart-row-col qty-div">
         {!props.checkout && <div onClick={()=>{this.changeQuntity('dec')}} className="inc-dec">-</div>}
          {this.state.quantity}
          {!props.checkout && <div onClick={()=>{this.changeQuntity('inc')}} className="inc-dec">+</div>}
        </div>
        <div className="cart-row-col">{this.getPrice()}</div>
        <div></div>
      </div>
      {/* : <div></div>} */}
      </div>
    );
  }
}

CartRow.propTypes = {
  classes: PropTypes.object.isRequired,
  cardDetails: PropTypes.object,
  renderCard: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  getCartData: getCartData(),
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeCartData }, dispatch);
}
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CartRow)));
