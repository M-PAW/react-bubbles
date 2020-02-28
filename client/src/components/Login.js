import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';


class Login extends React.Component {
  state = {
    credentials: {
    username: '',
    password: ''
    }
  };


  handleChange = e => {
    this.setState({
        credentials: {
            ...this.state.credentials,
            [e.target.name]: e.target.value
        }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
    
        .post('/api/login', this.state.credentials)
        .then(res => {
            window.localStorage.setItem('token', res.data.payload);

            this.props.history.push('/protected');
        })
        .catch(err => console.log(err));

  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <input 
            name="username" 
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input 
            name="password" 
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;