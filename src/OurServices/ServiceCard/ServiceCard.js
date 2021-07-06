import React, { Component } from 'react';
import './ServiceCard.scss';
import webappIcon from '../../assets/images/webapp.png';
import desktopIcon from '../../assets/images/desktop.png';
import mobileIcon from '../../assets/images/mobile.png';
import bugFixesIcon from '../../assets/images/bugFixes.png';
import maintenanceIcon from '../../assets/images/maintenance.png';
import upgradeIcon from '../../assets/images/upgrade.png';

class ServiceCard extends Component {
  render() {
    const classes = 'service-card ' + this.props.colorClass;
    const iconAndTitle = this.getIconAndTitle(this.props.type);
    const icon = iconAndTitle.icon;
    const title = iconAndTitle.title;
    const text = this.props.text;    

    return (
      <div className={classes}>
        <h1>{title}</h1>
        <img src={icon} />
        <span>{text}</span>
      </div>
    );
  }

  getIconAndTitle(type) {
    const iconAndTitle = {
      icon: null,
      title: ''
    };

    switch (type) {
      case 'webapp':
        iconAndTitle.icon = webappIcon;
        iconAndTitle.title = 'Web Apps';
        break;
      case 'desktop':
        iconAndTitle.icon = desktopIcon;
        iconAndTitle.title = 'Desktop Apps';
        break;
      case 'mobile':
        iconAndTitle.icon = mobileIcon;
        iconAndTitle.title = 'Mobile Apps';
        break;
      case 'bug-fixes':
        iconAndTitle.icon = bugFixesIcon;
        iconAndTitle.title = 'Bug Fixes';
        break;
      case 'maintenance':
        iconAndTitle.icon = maintenanceIcon;
        iconAndTitle.title = 'Maintenance';
        break;
      case 'upgrades':
        iconAndTitle.icon = upgradeIcon;
        iconAndTitle.title = 'Upgrades';
        break;
    }

    return iconAndTitle;
  }
}

export default ServiceCard;