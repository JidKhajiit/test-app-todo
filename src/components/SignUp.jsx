import React from 'react';
import '../App2.css';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import axios from 'axios';

const SignUp = function(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const lastNameRef = React.createRef();
  const firstNameRef = React.createRef();
  const { message, showMessage, responseAuth } = props;

  const requestRegistration = async aboutUser => {
    try {

      const response = await axios
        .post("http://localhost:3001/auth/signup", aboutUser)
      responseAuth(response.data);
    } catch (error) {
      showMessage(error.response.data);
    }
  }

  const sendSignUpData = event => {
    event.preventDefault();

    if (
      emailRef.current.value.trim()
        && passwordRef.current.value.trim()
        && lastNameRef.current.value.trim()
        && firstNameRef.current.value.trim()
    ) {
      const putUser = {
        login: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
        firstName: firstNameRef.current.value.trim(),
        lastName: lastNameRef.current.value.trim()
        
      };

      requestRegistration(putUser);
    } else {
      showMessage('Please fill in all the fields.');
    }
  };

  return (
    <>
      <input
        type="email"
        name="email"
        ref={emailRef}
        autoComplete="off"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        ref={passwordRef}
        autoComplete="off"
        placeholder="password"
      />
      <input
        type="text"
        name="first name"
        ref={firstNameRef}
        autoComplete="off"
        placeholder="first name"
      />
      <input
        type="text"
        name="last name"
        ref={lastNameRef}
        autoComplete="off"
        placeholder="last name"
      />
      <Button
        type="submit"
        onClick={sendSignUpData}
      > Send </Button>
      <p className="message">{message}</p>
    </>
  );
};

SignUp.propTypes = { message: PropTypes.string.isRequired };

export default SignUp;
