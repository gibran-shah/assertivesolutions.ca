import React, { Component } from 'react';
import './ServiceCard.scss';

class ServiceCard extends Component {
  render() {
    const classes = 'service-card ' + this.props.type;
    console.log('classes=', classes);
    return (
      <div className={classes}></div>
    );
  }
}

export default ServiceCard;