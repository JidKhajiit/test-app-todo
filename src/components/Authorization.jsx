import React from 'react';
import PropTypes from 'prop-types';
import Signin from './SignIn';
import SignUp from './SignUp';
import { Button } from 'reactstrap';

const Authorization = function(props) {
  const { renderAuthForm, responseAuth, loginFormToggle, message, replaceLoginForm, showMessage } = props;
  const form = loginFormToggle ? 
    <SignUp message={message} showMessage={showMessage} responseAuth={responseAuth}/> : 
    <Signin message={message} showMessage={showMessage} responseAuth={responseAuth}/>;


  const switchForm = function(event) {
    const toggle = event.target.name !== 'login';

    if (toggle !== loginFormToggle) {
      replaceLoginForm(!loginFormToggle);
    }
  };

  const closeLoginForm = () => {
    renderAuthForm(false);
  };

  return (
    <div className="main">
      <div className="window">
        <button
          type="button"
          className="close"
          onClick={closeLoginForm}
        />
        <Button
          type="button"
          name="login"
          onClick={switchForm}
        >
          Sign In
        </Button>
        <Button
          type="button"
          name="signup"
          onClick={switchForm}
        >
          Sign Up
        </Button>

        {form}
      </div>

    </div>
  );
};

Authorization.propTypes = {
  loginFormToggle: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Authorization;
