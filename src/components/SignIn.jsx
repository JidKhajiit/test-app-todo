
import React from 'react';
import '../App2.css';
import './Form.css';
// import { URL } from '../constants';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import axios from 'axios';

const Login = function(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const { message, showMessage, responseAuth } = props;


  const requestAuth = async newUser => {
    try {
      const { current: { value: email } } = emailRef;
      const { current: { value: password } } = passwordRef; 
      const response = await axios
          .post("http://localhost:3001/auth/signin", {
              login: email.trim(),
              password: password.trim()
          })
      responseAuth(response.data);
      // history.push('/tasks');
    } catch (error) {
        showMessage(error.response.data);
    }
  }

  const sendLoginData = event => {
    event.preventDefault();

    if (emailRef.current.value.trim() && passwordRef.current.value.trim()) {
      if (emailRef.current.value.includes('@gmail.com')) {
        showMessage('You should use the Google+ button.');
      } else {
        const newUser = {
          email: emailRef.current.value.trim(),
          password: passwordRef.current.value.trim(),
        };

        requestAuth(newUser);
      }
    } else {
      showMessage('Login or password not entered. U fucking cocksucker!');
    }
  };

  return (
    <>
        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          autoComplete="off"
          placeholder="password"
        />
        <Button
          type="submit"
          
          onClick={sendLoginData}
        > Send </Button>
      {/* <p className="warning">*Please, use the Google+ button to login with @gmail.com</p> */}
      {/* <a href={`${URL}auth/google`}>Google+</a> */}
      <p className="error-message">{message}</p>
    </>
  );
};

Login.propTypes = { message: PropTypes.string.isRequired };

export default Login;
