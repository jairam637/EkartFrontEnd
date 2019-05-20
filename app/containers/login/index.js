import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { postRequest } from './../../includes/api/apicall';
import REQUESTS from './../../includes/api/urls';
import './styles.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  callLogin = () => {
    let data = {
      "username": this.state.username,
      "password": this.state.password
    }
    const props = {
      returnError: false,
    }
    if(this.state.password && this.state.username){
      postRequest(data, REQUESTS.post.login, props).then((response) => {
        if (response && response.status === 200) {
          localStorage.setItem('token', response.data.token); 
          this.props.history.push('/messages');
        }
      })
    }
    else{
      alert('fill all the fields with proper details')
    }
    
  }
  render() {
    return (
      <div className="App">
        <div> username:   <input onChange={(e) => { this.setState({ username: e.target.value }) }} /></div>
        <div> password:   <input onChange={(e) => { this.setState({ password: e.target.value }) }} /></div>
        <button onClick={this.callLogin}> login </button>
      </div>
    );
  }
}

export default withRouter(Login);
