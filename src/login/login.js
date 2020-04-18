import React, { Component } from 'react';
import './login.scss';
import axios from '../axios/axiosInstance';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            accessToken: null,
            loginFailed: false,
            passwordType: 'password'
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
                this.props.loginSuccess(response.data.user.stsTokenManager.accessToken);
            }).catch(err => {
                this.setState({
                    accessToken: null,
                    loginFailed: true
                });
            });
    }

    togglePasswordType = () => {
        this.setState({passwordType: this.state.passwordType === 'password' ? 'text' : 'password'});
    }

    render() {

        let passwordType = this.state.passwordType;
        let hidePasswordIconClass = 'far fa-eye hide-show-password';
        if (passwordType === 'text') hidePasswordIconClass = 'far fa-eye-slash hide-show-password';

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
                            <input type={passwordType}
                                placeholder="Password"
                                name="password"
                                ref={this.passwordRef}
                                required />
                            <i className={hidePasswordIconClass} onClick={this.togglePasswordType}></i>
                        </div>
                        <div className="login-submit">
                            <button className="submit-login-button" type="submit"><i className="fas fa-sign-in-alt">&nbsp;&nbsp;&nbsp;</i>Sign In</button>
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
