import React, { Component, useEffect } from 'react';
import '../../App.scss';
import './ContactMethod.scss';
// eslint-disable-next-line
import callUsIcon from '../../assets/images/call-us-icon.png';

class ContactMethod extends Component {
    
    componentDidMount() {
        // https://stackoverflow.com/questions/59763210/how-do-i-grab-my-google-custom-search-input-in-my-react-application
        if (this.props.methodType === 'search') {
            let searchInput = document.querySelector('#gsc-i-id1');
            if (searchInput) {
                searchInput.placeholder = 'What do you want to search?';
            } else {
                const timer = setInterval(() => {
                    searchInput = document.querySelector('#gsc-i-id1');
                    if (searchInput) {
                        searchInput.placeholder = 'What do you want to search?';
                        clearInterval(timer);
                    }
                }, 500);
            }
        }
    }

    render() {
        // Figure out which contact method this is:
        let methodTypeName = '';
        let methodTypeValue = '';
        let icon = '';
        switch (this.props.methodType) {
            case 'phone':
                methodTypeName = 'Call Us';
                methodTypeValue = '403-999-4951';
                icon = require('../../assets/images/call-us-icon.png');
                break;
            case 'email':
                methodTypeName = 'Email Us';
                methodTypeValue = 'support@assertivesolutions.ca';
                icon = require('../../assets/images/email-us-icon.png');
                break;
            case 'search':
                methodTypeName = 'Search';
                methodTypeValue = 'Enter search here...';
                icon = require('../../assets/images/search-icon.png');
                break;
            // need default case
        }

        // If this is search, we want an input field:
        var valueElement = <span className="contact-method-value">{ methodTypeValue }</span>;
        if (this.props.methodType === 'search') {
            valueElement = <div className="gcse-search" />
        }

        // Return the component:
        return (
            <div className="contact-method flex-row-space-between">
                <div className="flex-column-center">
                    <img src={ icon } alt="{ icon }" />
                </div>
                <div className="name-and-value flex-column-space-around">
                    <span className="contact-method-name">{ methodTypeName }</span>
                    { valueElement }
                </div>
            </div>
        );
    }
}

export default ContactMethod;