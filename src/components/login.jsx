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
            // currentUser: "podpivasnik228", 
            // currentPass: "sliva",
            message: ""
        };
    }

    handleLoginButton = async () => {
        const { state: { username, password, currentUser, currentPass }, props: { history, changeAuthFlag } } = this;
        console.log(this.props);
        console.log(currentUser, currentPass, username, password);
        if (username && password) {
            try {
                await axios
                    .post("https://localhost:3001/signin", {
                        login: username,
                        password
                    })
                    .then(response => {
                        console.log(response.data)
                        changeAuthFlag(true);
                        history.push('/tasks');
                    })
                    .catch(error => console.log(error));
            } catch {

            }

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
                    <Input type="password" value={password} onChange={this.handleChangeInputText} name="password" placeholder="Спокойно... Это всего лишь слива" />
                    <Button className="login-button" color="success" onClick={this.handleLoginButton} >Send</Button>{' '}
                    <p className="error-message">{message}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);