import React from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoList from './components/todoList';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem('authToken');
    const isAuthentificated = userId ? true : false;
    console.log(userId)
    console.log(isAuthentificated)
    this.state = {
      customHistory: createBrowserHistory(),
      userId,
      isAuthentificated
    };
  }

  editAuthToken = (token) => {
    const flag = token ? true : false;

    localStorage.setItem('authToken', token);
    this.setState({isAuthentificated: [flag]});
  }

  render() {
    const { state: { customHistory, isAuthentificated, userId }, editAuthToken } = this;

    return (
      <div className="App">
        <Router history={customHistory} >
          {/* <Route path="/" component={Header} /> */}
          <Route exact path="/tasks"  component={()=> <TodoList isAuthentificated={isAuthentificated} userId={userId}/>} />
          <Route exact path="/login"  component={()=> <Login editAuthToken={editAuthToken} />} />

        </Router>
      </div>
    );    
  }
}

export default App;
