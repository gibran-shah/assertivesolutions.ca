import React, { Component } from 'react';
import './login.scss';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <form>
                    <div className="form-element">
                        <label htmlFor="username">Email</label><br/>
                        <input type="text"
                            placeholder="Username or email"
                            name="username"
                            required />
                    </div>
                    <div className="password form-element">
                        <label htmlFor="password">Password</label><br/>
                        <input type="password"
                            placeholder="Password"
                            name="password"
                            required />
                    </div>
                    <div className="login-submit form-element">
                        <button className="submit-button shrink-button" type="submit"><i class="fas fa-sign-in-alt">&nbsp;&nbsp;&nbsp;</i>Sign In</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default Login;
