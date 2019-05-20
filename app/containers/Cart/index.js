import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.css';
import PropTypes from 'prop-types';
import Geocode from "react-geocode";
import CartRow from './../../components/CartRow';
import { withRouter } from 'react-router';
import { storeCartData } from './actions';
import { getCartData } from './selectors';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getRequest } from './../../includes/api/apicall';
import REQUESTS from './../../includes/api/urls';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: "right",
    marginRight: "5%",
    fontSize: "20px"
  },
  input: {
    display: 'none',
  },
});

class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cartDetails: [],
      toatlValues: {quantity: 0, price: 0},
    };
    this.cartDetails = []
    this.getTotal = this.getTotal.bind(this);
  }
  
  componentWillReceiveProps(props){
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
    if(cartItems !== props.getCartData){
      this.getTotal();
      this.renderCard();
  
    }
    
  }
  renderCard = () => {
    // console.log('calling')
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
    let cartDetails = [];
    let cardDetails = [];
    getRequest(null, REQUESTS.get.items.api).then((response) => {
      const {data} = response.data;
      for(let i=0;i<data.length; i++){
        const card = {id: i, name: data[i]['name'], url: data[i]['url'],
          price: data[i]['price']};
        if(Object.keys(cartItems).includes(i.toString()) && cartItems[i]['noOfItems'] !== 0){
          card['quantity'] = cartItems[i]['noOfItems']
         cartDetails.push(card)
        }
        cardDetails.push(card)
      }
      this.setState({ cartDetails, cardDetails },()=>{
        this.getTotal();
      });
    })
  }
  async componentDidMount(){
    this.renderCard();
  }
  getTotal = () => {
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
    let toatlValues = {quantity: 0, price: 0};
    const entries = cartItems && Object.entries(cartItems)
    if(entries && this.state.cardDetails){
      for(let i = 0; i< entries.length; i++){
        toatlValues['quantity'] += entries[i][1]['noOfItems'];
        toatlValues['price'] += entries[i][1]['noOfItems'] * this.state.cardDetails[entries[i][0]]['price'];
      }
      this.setState({toatlValues})
    }
  }
  shouldComponentUpdate(){
    return true;
  }
  render() {
    const {classes} =this.props;
    return (
      <div className="cart-div">
        {!this.props.checkout && this.state.toatlValues['quantity'] > 0 && <div className="cart-row-div">
          <div className="cart-row-col prod-name">Name</div>
          <div className="cart-row-col qty-div">Quantity</div>
          <div className="cart-row-col">Price</div>
    </div> }
        {this.state.cartDetails.map((card, index) => {
          return <div key={index}><CartRow cartDetails={card} renderCard={this.renderCard} checkout={this.props.checkout}/>
            
          </div>
        })}
        {this.state.toatlValues['quantity'] ? <div className="cart-row-div">
          <div className="cart-row-col prod-name">Total</div>
          <div className="cart-row-col qty-div">{this.state.toatlValues['quantity']}</div>
          <div className="cart-row-col">{this.state.toatlValues['price']}</div>
        </div> :
          <h2>Cart is empty</h2>}
        {!this.props.checkout&& this.state.toatlValues['quantity'] > 0 &&<Button variant="contained" color="primary" 
        className={classes.button} 
        onClick={()=>{this.props.history.push('/checkout')}}
        >
          Checkout
      </Button>}
      </div>
    );
  }
}
Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = createStructuredSelector({
  getCartData: getCartData(),
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeCartData }, dispatch);
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart)));      