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

        axios.get('/auth', {
            headers: {
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            }
        }).then(response => {
            this.setState({
                accessToken: response.data.user.stsTokenManager.accessToken,
                loginFailed: false
            });
            this.props.loginSuccess(
                response.data.user.stsTokenManager.accessToken,
                response.data.user.stsTokenManager.expirationTime
            );
            this.usernameRef.current.value = '';
            this.passwordRef.current.value = '';
        }).catch(err => {
            console.log('err=', err);
            this.setState({
                accessToken: null,
                loginFailed: true
            });
        });
    }

    signout = (e) => {
        e.preventDefault();
        
        axios.get('/auth/signout', {
            headers: {
                Authorization: this.state.accessToken
            }
        }).then(() => {
            this.setState({accessToken: null});
            this.props.logoutSuccess();
        }).catch(err => {
            console.log('err=', err);
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

        let submitButtonText = 'Sign In';
        let submitButtonClass = 'fas fa-sign-in-alt';
        let usernameDivClass = 'form-element flex-column-end';
        let passwordDivClass = 'form-element flex-column-end';
        let submitHandler = this.signin;
        let required = true;
        if (!!this.props.accessToken) {
            submitButtonText = 'Sign Out';
            submitButtonClass = 'fas fa-sign-out-alt';
            usernameDivClass = 'hidden';
            passwordDivClass = 'hidden';
            submitHandler = this.signout;
            required = false;
        }

        return (
            <div className="login-container">
                <form className={formClass} onSubmit={submitHandler}>
                    <div className="flex-row-end">
                        <div className={usernameDivClass}>
                            <input type="text"
                                placeholder="Username or email"
                                name="username"
                                ref={this.usernameRef}
                                required={required} />
                        </div>
                        <div className={passwordDivClass}>
                            <input type={passwordType}
                                placeholder="Password"
                                name="password"
                                ref={this.passwordRef}
                                required={required} />
                            <i className={hidePasswordIconClass} onClick={this.togglePasswordType}></i>
                        </div>
                        <div className="login-submit">
                            <button className="submit-login-button" type="submit"><i className={submitButtonClass}>&nbsp;&nbsp;&nbsp;</i>{submitButtonText}</button>
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
