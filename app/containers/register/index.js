import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { postRequest } from './../../includes/api/apicall';
import REQUESTS from './../../includes/api/urls';
import './styles.css';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: '',

    }
  }
  callSubmit = () => {
    let data = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2,
      email: this.state.email

    }
    const props = {
      returnError: false,
    }
    if (this.state.password1 && this.state.username && this.state.password2 && this.state.email) {
      postRequest(data, REQUESTS.post.register, props).then((response) => {
        if (response && response.status === 201) {
          localStorage.setItem('token', response.data.token);
          this.props.history.push('/messages');
        }
      })
    }
    else {
      alert('fill all the fields with proper details')
    }

  }
  render() {
    return (
      <div className="App">
        <div> email:   <input onChange={(e) => { this.setState({ email: e.target.value }) }} /></div>
        <div> username:   <input onChange={(e) => { this.setState({ username: e.target.value }) }} /></div>
        <div> password:   <input onChange={(e) => { this.setState({ password1: e.target.value }) }} /></div>
        <div> confirm password:   <input onChange={(e) => { this.setState({ password2: e.target.value }) }} /></div>
        <button onClick={this.callSubmit}> Register </button>
      </div>
    );
  }
}

export default withRouter(Register);
