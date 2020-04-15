import React, { Component } from 'react';
import './login.scss';
import axios from '../axios/axiosInstance';

class Login extends Component {

    constructor() {
        super();

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    signin = (e) => {
        e.preventDefault();
        axios.get('/auth', {headers: {
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value}}).then(response => {
                console.log('response=', response);
            }).catch(err => {
                if (err.response && err.response.status == 401) {
                    console.log('Sign in failed');
                } else {
                    console.log('Something went wrong.');
                }
            });
    }

    render = () => {

        return (
            <div className="login-container">
                <form onSubmit={this.signin}>
                    <div className="flex-row-end">
                        <div className="form-element flex-column-end">
                            <input type="text"
                                placeholder="Username or email"
                                name="username"
                                ref={this.usernameRef}
                                onChange={this.changeHandler}
                                required />
                        </div>
                        <div className="form-element flex-column-end">
                            <input type="password"
                                placeholder="Password"
                                name="password"
                                ref={this.passwordRef}
                                onChange={this.changeHandler}
                                required />
                        </div>
                        <div className="login-submit">
                            <button className="submit-login-button" type="submit"><i className="fas fa-sign-in-alt">&nbsp;&nbsp;&nbsp;</i>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;

// https://stackoverflow.com/questions/61113532/form-submit-re-renders-page-in-react