import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import '../App.css';
import logo from '../logo.svg';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            currentUser: "podpivasnik228", 
            currentPass: "sliva",
            message: ""
        };
    }

    handleLoginButton = () => {
        const { state: { username, password, currentUser, currentPass }, props: { history, changeAuthFlag } } = this;
        console.log(this.props);
        console.log(currentUser, currentPass, username, password);
        if (username === currentUser && password === currentPass) {
            console.log("go!");
            changeAuthFlag(true);
            history.push('/tasks');
        } else {
            this.setState({ message: "invalide username or password" });
        }
    }

    handleChangeInputText = (event) => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value, });
    }

    render() {
        const { state: { username, password, message } } = this;

        return (
            <div className="profile-field">
                <div className="avatar">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <h1>Login</h1>
                <div className="login-area">
                    <Input value={username} onChange={this.handleChangeInputText} name="username" placeholder="username..." />
                    <Input value={password} onChange={this.handleChangeInputText} name="password" placeholder="password..." />
                    <Button className="login-button" color="success" onClick={this.handleLoginButton} >Send</Button>{' '}
                    <p className="error-message">{message}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);