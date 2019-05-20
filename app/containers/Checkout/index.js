import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.css';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { postRequest } from './../../includes/api/apicall';
import REQUESTS from './../../includes/api/urls';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getRequest } from './../../includes/api/apicall';
// import REQUESTS from './../../includes/api/urls';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cart from './../Cart';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonConfirm:{
    width: 250
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
});

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {},
      payTypes: ['Credit Card', 'Net Banking', 'Cash on Delivery'],
      selectedValue: 'Credit Card'
    };
  }

  componentDidMount() {
    
  }
  handleChange = name => event => {
    let { fieldValues } = this.state;
    fieldValues[name] = event.target.value;
    this.setState({ fieldValues });
  };
  getAddress = () => {
    const params = { lon: localStorage.getItem('longitude'), lat: localStorage.getItem('latitude'), }
    postRequest(params, REQUESTS.get.location.api).then((response) => {
      if(response.status == 200){
        let { fieldValues } = this.state;
        fieldValues['city'] = response.data.data[0].name;
        fieldValues['state'] = response.data.data[0].admin1;
        fieldValues['address'] = response.data.data[0].admin2;
        this.setState({ address: response.data.data, fieldValues })
      }
      else{
        alert('unable to fetch address. Manually fill all the details')
      }
    })
  }
  handleRadio = event => {
    this.setState({ selectedValue: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="checkout-div">
        <h2 className="detals">Personal Details</h2>
        <div>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.fieldValues.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
        </div>


        <div>
          <TextField
            id="standard-name"
            label="email"
            className={classes.textField}
            value={this.state.fieldValues.email ? this.state.fieldValues.email : ''}
            onChange={this.handleChange('email')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="standard-name"
            label="Phone"
            className={classes.textField}
            value={this.state.fieldValues.phone ? this.state.fieldValues.phone : ''}
            onChange={this.handleChange('phone')}
            margin="normal"
          />
        </div>

        <h2 className="detals">Delivary Address</h2>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.getAddress()}}>
        Use My current address
      </Button>
        <div>
          <TextField
            id="standard-name"
            label="address"
            className={classes.textField}
            value={this.state.fieldValues.address ? this.state.fieldValues.address : ''}
            onChange={this.handleChange('address')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="standard-name"
            label="Pincode"
            className={classes.textField}
            value={this.state.fieldValues.pincode ? this.state.fieldValues.pincode : ''}
            onChange={this.handleChange('pincode')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="standard-name"
            label="City"
            className={classes.textField}
            value={this.state.fieldValues.city ? this.state.fieldValues.city : ''}
            onChange={this.handleChange('city')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="standard-name"
            label="State"
            className={classes.textField}
            value={this.state.fieldValues.state ? this.state.fieldValues.state : ''}
            onChange={this.handleChange('state')}
            margin="normal"
          />
        </div>
        <h2 className="detals">Order Summary</h2>
        <div className="cart-div"><Cart checkout={true}/></div>



        <h2 className="detals">Payment Options</h2>
        {this.state.payTypes.map((data, index )=> {
          return (<div className={data === 'Cash on Delivery' ? '':'cod-div'}>
            <Radio
          checked={this.state.selectedValue === data}
          onChange={this.handleRadio}
          value={data}
          color="default"
          name="radio-button-demo"
          aria-label="D"
        /> :     {data}
            </div>)

        })}
        <Button variant="contained" color="primary" className={classes.buttonConfirm} >
        Confirm Order
      </Button>
      </div>
    );
  }
}
Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = createStructuredSelector({
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout)));      