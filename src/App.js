import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoList from './components/todoList';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import axios from 'axios';
import jwt_decode from "jwt-decode";


class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('authToken'),
      isAuthentificated = token ? true : false,
      firstName = token ? jwt_decode(token).firstName : "Dungeon Master",
      lastName = token ? jwt_decode(token).lastName : "Sliva";

    // console.log(isAuthentificated)
    this.state = {
      customHistory: createBrowserHistory(),
      token,
      aboutUser: {
        firstName,
        lastName
      },
      isAuthentificated,
      loginFormToggle: false,
      message: null,
      ifAuthForm: false
    };
  }

  showMessage = (message) => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: "" }), 5000);
  }

  replaceLoginForm = (toggle) => this.setState({ loginFormToggle: toggle });

  renderAuthForm = (ifNeed) => this.setState({ ifAuthForm: ifNeed });


  responseAuth = (token) => { //user
    const { firstName, lastName } = jwt_decode(token);
    console.log(firstName, lastName);
    const { state: { customHistory } } = this;
    try {
      localStorage.setItem('authToken', token);
      const aboutUser = {
        firstName,
        lastName
      }
      this.setState({
        isAuthentificated: true,
        ifAuthForm: false,
        token,
        aboutUser
      }, () => {
        console.log("afterall", this.state);
        customHistory.push('/tasks');

      });
    } catch (error) {
      console.log(error.message);
    }

  }

  deleteAuthToken = () => {
    localStorage.removeItem('authToken');

    this.setState({ isAuthentificated: false, ifAuthForm: false, token: '' });
  }

  render() {
    const { state: { message, customHistory, isAuthentificated, token, aboutUser, loginFormToggle, ifAuthForm }, showMessage, responseAuth, deleteAuthToken, renderAuthForm, replaceLoginForm } = this;

    return (
      <div className="App">
        <Router >
          <Route path="/" component={() => {
            return <Header
              info={aboutUser}
              token={token}
              loginFormToggle={loginFormToggle}
              message={message}
              ifAuthForm={ifAuthForm}
              renderAuthForm={renderAuthForm}
              replaceLoginForm={replaceLoginForm}
              showMessage={showMessage}
              responseAuth={responseAuth}
              deleteAuthToken={deleteAuthToken}
              isAuthentificated={isAuthentificated}
            />
          }}
          />
          <Route exact path="/tasks" component={() => <TodoList isAuthentificated={isAuthentificated} token={token} />} />
          {/* <Route exact path="/login" component={() => <Login isAuthentificated={isAuthentificated} />} /> */}
        </Router>
      </div>
    );
  }
}

export default App;
