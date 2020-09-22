import axios from 'axios';
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
            message: ""
        };
    }

    showErrorMessage = (message) => {
        this.setState({ message });
        setTimeout(() => this.setState( { message: "" } ), 5000);
    }

    handleLoginButton = async () => {
        const { state: { username, password }, props: { history, editAuthToken } } = this;
        if (username && password) {
            console.log("authRequest");
            try {
                console.log(username, password)
                const response = await axios
                    .post("http://localhost:3001/auth/signin", {

                        login: username,
                        password
                    })
                editAuthToken(response.data["_id"]);
                history.push('/tasks');
            } catch (error) {
                this.showErrorMessage(error.response.data);
            }

        } else {
            this.showErrorMessage( "Enter username and password." );
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
                    <Input type="password" value={password} onChange={this.handleChangeInputText} name="password" placeholder="Спокойно... Это всего лишь слива" />
                    <Button className="login-button" color="success" onClick={this.handleLoginButton} >Send</Button>{' '}
                    <p className="error-message">{message}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);