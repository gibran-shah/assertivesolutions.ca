import React, { Component } from 'react';
import './ServiceCard.scss';
import webappIcon from '../../assets/images/webapp.png';
import desktopIcon from '../../assets/images/desktop.png';
import mobileIcon from '../../assets/images/mobile.png';

class ServiceCard extends Component {
  render() {
    const classes = 'service-card ' + this.props.colorClass;
    const type = this.props.type;
    const icon = type === 'webapp' ? webappIcon : (type === 'desktop' ? desktopIcon : mobileIcon);

    return (
      <div className={classes}>
        <img src={icon} />
      </div>
    );
  }
}

export default ServiceCard;