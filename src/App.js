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
    this.state = {
      customHistory: createBrowserHistory(),
      isAuthentificated: false
    };
  }

  changeAuthFlag = (flag) => {
    this.setState({isAuthentificated: [flag]});
  }

  render() {
    const { state: { customHistory, isAuthentificated }, changeAuthFlag } = this;

    return (
      <div className="App">
        <Router history={customHistory} >
          {/* <Route path="/" component={Header} /> */}
          <Route exact path="/tasks"  component={()=> <TodoList isAuthentificated={isAuthentificated}/>} />
          <Route exact path="/login"  component={()=> <Login changeAuthFlag={changeAuthFlag} />} />

        </Router>
      </div>
    );    
  }
}

export default App;
