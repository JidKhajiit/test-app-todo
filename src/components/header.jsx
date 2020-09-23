import React, { memo } from 'react';
import '../App2.css';
import Authorization from './Authorization';
import { Button } from 'reactstrap';

const Header = function(props) {
  const { 
    deleteAuthToken,
    responseAuth,
    token,
    info,
    ifAuthForm,
    loginFormToggle,
    message,
    showMessage,
    renderAuthForm,
    replaceLoginForm 
  } = props;

  const buttonUserControl = (token) // && token.includes('JWT ')
    ? (
      <>
        <Button type="button" onClick={deleteAuthToken}>Logout</Button>
          <p>
            {`${info.firstName.slice(0, 1)}. ${info.lastName}`}
          </p>
      </>
    ) : (
      <Button
        type="button"
        onClick={() => renderAuthForm(true)}
      >
        Login
      </Button>
    );

  const authorization = ifAuthForm ? (
    <Authorization
      renderAuthForm={renderAuthForm}
      replaceLoginForm={replaceLoginForm}
      loginFormToggle={loginFormToggle}
      message={message}
      showMessage={showMessage}
      responseAuth={responseAuth}
    />
  ) : (<div />);

  return (
    <div className="app-header">
      <h1>TODO List</h1>
      {buttonUserControl}
      {authorization}
    </div>
  );
};

export default memo(Header);
