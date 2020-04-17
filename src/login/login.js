import React, { Component } from 'react';
import './login.scss';
import axios from '../axios/axiosInstance';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            accessToken: null,
            loginFailed: false
        };

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    signin = (e) => {
        e.preventDefault();
        axios.get('/auth', {headers: {
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value}}).then(response => {
                this.setState({
                    accessToken: response.data.user.stsTokenManager.accessToken,
                    loginFailed: false
                });
            }).catch(err => {
                this.setState({
                    accessToken: null,
                    loginFailed: true
                });
            });
    }

    render() {

        let formClass = null;
        let loginFailedDiv = null;
        if (this.state.loginFailed) {
            formClass = 'login-failed';
            loginFailedDiv = (
                <div className="login-failed-message">
                    Either the email/username or the password you entered was invalid. Please try again.
                </div>
            );
        }

        return (
            <div className="login-container">
                <form className={formClass} onSubmit={this.signin}>
                    <div className="flex-row-end">
                        <div className="form-element flex-column-end">
                            <input type="text"
                                placeholder="Username or email"
                                name="username"
                                ref={this.usernameRef}
                                required />
                        </div>
                        <div className="form-element flex-column-end">
                            <input type="password"
                                placeholder="Password"
                                name="password"
                                ref={this.passwordRef}
                                required />
                        </div>
                        <div className="login-submit">
                            <button className="submit-login-button" type="submit"><i class="fas fa-sign-in-alt">&nbsp;&nbsp;&nbsp;</i>Sign In</button>
                        </div>
                    </div>
                </form>
                {loginFailedDiv}
            </div>
        );
    }
};

export default Login;

// https://stackoverflow.com/questions/61113532/form-submit-re-renders-page-in-react
