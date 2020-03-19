import React, { Component } from 'react';
import './ContactUs.scss';
import axios from '../axios/axiosInstance';

class ContactUs extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            inquiry: '',
            inquirySent: false,
            inquiryFailed: false,
            submitting: false
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({submitting: true});

        axios.post('/contact', this.state).then(response => {
        //axios.post('http://localhost:3001/contact', this.state, config).then(response => {
            this.setState({inquirySent: true, inquiryFailed: false, submitting: false});
        }).catch(err => {
            this.setState({inquirySent: false, inquiryFailed: true, submitting: false});
        });
    }

    render() {
        const phonePattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}' + '|'
            + '[0-9]{3}[0-9]{3}[0-9]{4}' + '|'
            + '[0-9]{3}.[0-9]{3}.[0-9]{4}' + '|'
            + '[0-9]{3} [0-9]{3} [0-9]{4}';

        let inquiryFeedback = null;
        if (this.state.inquirySent) {
            inquiryFeedback = (
                <div className="span-grid inquiry-sent">
                    Your inquiry has been sent.
                </div>);
        } else if (this.state.inquiryFailed) {
            inquiryFeedback = (
                <div className="span-grid inquiry-failed">
                    There was a problem sending your inquiry. Please try again later.
                </div>);
        }

        return (
            <section>
                <a name="contact-us" />
                <div className="contact-us-main">
                    <div className="section-heading">
                        <span className="heading-text contact-us-heading">contact <span className="primary-text">us</span></span>
                    </div>
                    <div className="contact-us-blurb">
                        Feel free to contact us using the form below.
                    </div>
                    <form onSubmit={this.submitHandler}>
                        <div className="contact-us-form as-form">
                            <div>
                                <label htmlFor="firstName">First Name</label><br/>
                                <input type="text"
                                    placeholder="Please enter your first name"
                                    name="firstName"
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div className="spacer">{/*spacer*/}</div>

                            <div>
                                <label htmlFor="lastName">Last Name</label><br/>
                                <input type="text"
                                    placeholder="Please enter your last name"
                                    name="lastName"
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label><br/>
                                <input type="email"
                                    placeholder="Please enter your email"
                                    name="email"
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div className="spacer">{/*spacer*/}</div>

                            <div>
                                <label htmlFor="phone">Phone</label><br/>
                                <input type="phone"
                                    placeholder="Please enter your phone number"
                                    pattern={phonePattern}
                                    name="phone"
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div className="span-grid">
                                <label htmlFor="company">Company</label><br/>
                                <input type="text"
                                    placeholder="Please enter your company name"
                                    name="company"
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div className="span-grid inquiry-textarea">
                                <label htmlFor="inquiry">What would you like to say?</label><br/>
                                <textarea name="inquiry"
                                    onChange={this.changeHandler}
                                    required>
                                </textarea>
                            </div>

                            <div className="span-grid submit-button-div">
                                <button className="submit-button" type="submit"><i className="fas fa-paper-plane">&nbsp;</i>Submit</button>
                            </div>

                            {inquiryFeedback}
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default ContactUs;