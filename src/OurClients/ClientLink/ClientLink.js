import React, { Component } from 'react';
import './ClientLink.scss';

class ClientLink extends Component {
    render() {
        return (
            <a className="client-logo-href" href={this.props.link} target="_blank">
                <img className="client-logo-img" src={this.props.logo} alt={this.props.altText} />
            </a>
        );
    }
}

export default ClientLink;