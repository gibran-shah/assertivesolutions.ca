import React, { Component } from 'react';
import './login.scss';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <form>
                    <div className="flex-row-end">
                        <div className="form-element flex-column-end">
                            <input type="text"
                                placeholder="Username or email"
                                name="username"
                                required />
                        </div>
                        <div className="form-element flex-column-end">
                            <input type="password"
                                placeholder="Password"
                                name="password"
                                required />
                        </div>
                        <div className="login-submit">
                            <button className="submit-login-button" type="submit"><i class="fas fa-sign-in-alt">&nbsp;&nbsp;&nbsp;</i>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default Login;
