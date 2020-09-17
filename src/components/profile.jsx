import React from 'react';
import '../App.css';
import logo from '../logo.svg';

class Prifile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    
    render() {
        return (
            <div className="profile-field">
                <div className="avatar">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="profile-info">
                    Влаdick
                    <br/>
                    Уровень: 1
                    <div className="scale">
                    0 из 100
                    </div>
                </div>
            </div>
        );
    }
}

export default Prifile;