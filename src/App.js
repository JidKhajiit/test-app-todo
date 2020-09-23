import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoList from './components/todoList';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import axios from 'axios';


class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem('authToken');
    const isAuthentificated = userId ? true : false;
    console.log(userId)
    // console.log(isAuthentificated)
    this.state = {
      customHistory: createBrowserHistory(),
      userId,
      aboutUser: {
        firstName: "Dungeon Master",
        lastName: "Sliva"
      },
      isAuthentificated,
      loginFormToggle: false,
      message: null,
      ifAuthForm: false
    };
  }

  async componentDidMount() {
    const { state: { userId } } = this;
    if(this.state.userId) {
      try {
        const response = await axios
            .get(`http://localhost:3001/auth/${userId}`)
        this.setState({aboutUser: response.data});
      } catch (error) {
          console.log("&&&", error.response.data);
      }
    }
  }

  showMessage = (message) => {
    this.setState({ message });
    setTimeout(() => this.setState( { message: "" } ), 5000);
  }

  replaceLoginForm = (toggle) => this.setState({loginFormToggle: toggle});

  renderAuthForm = (ifNeed) => this.setState({ifAuthForm: ifNeed});


  responseAuth = (user) => {
    try {
      localStorage.setItem('authToken', user["_id"]);
      const aboutUser = {
        firstName: user.firstName,
        lastName: user.lastName
      }
      this.setState({
        isAuthentificated: true,
        ifAuthForm: false,
        userId: user["_id"],
        aboutUser
      });
    } catch (error){
      console.log(error.message);
    }

  }

  deleteAuthToken = () => {
    localStorage.removeItem('authToken');

    this.setState({isAuthentificated: false, ifAuthForm: false, userId: ''});
  }

  render() {
    const { state: { message, customHistory, isAuthentificated, userId, aboutUser, loginFormToggle, ifAuthForm }, showMessage, responseAuth, deleteAuthToken, renderAuthForm, replaceLoginForm } = this;

    return (
      <div className="App">
        <Router history={customHistory} >
          <Route path="/" component={()=> {
            return <Header 
              info={aboutUser}
              token={userId}
              loginFormToggle={loginFormToggle}
              message={message}
              ifAuthForm={ifAuthForm}
              renderAuthForm={renderAuthForm}
              replaceLoginForm={replaceLoginForm}
              showMessage={showMessage}
              responseAuth={responseAuth}
              deleteAuthToken={deleteAuthToken}
            />}}
          />
          <Route exact path="/tasks"  component={()=> <TodoList isAuthentificated={isAuthentificated} userId={userId}/>} />
          {/* <Route exact path="/login"  component={()=> <Login editAuthToken={editAuthToken} />} /> */}
          {/* <Redirect from="/" to="/tasks" /> */}
        </Router>
      </div>
    );    
  }
}

export default App;
