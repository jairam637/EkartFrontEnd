/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './styles.css';
import MediaCard from './../../components/Cards';
import {getRequest} from './../../includes/api/apicall';
import REQUESTS from './../../includes/api/urls';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      cardDetails: []
    };
    this.cardDetails = []
  }
  componentDidMount(){
    let cardDetails = [];
    getRequest(null, REQUESTS.get.items.api).then((response) => {
      const {data} = response.data;
      for(let i=0;i<data.length; i++){
        const card = {id: i, name: data[i]['name'], url: data[i]['url'],
        price: data[i]['price'], showkartBut: true}
       cardDetails.push(card)
      }
      this.setState({ cardDetails });
    })
    
    
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          </header> */}
          
          <div className="mediacard-div">
          {this.state.cardDetails.map((card, index)=>{
            return (<div key={index} className="card-inner-div"><MediaCard cardDetails={card}/></div>)
          })}
          </div>
      </div>
    );
  }
}
              {/* <span onClick={()=>{this.props.history.push('/login')}} className="login-but">Login</span>
              <span onClick={()=>{this.props.history.push('/register')}} className="login-but">Register</span> */}
              