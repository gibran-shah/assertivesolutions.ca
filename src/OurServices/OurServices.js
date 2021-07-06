import React, { Component } from 'react';
import './OurServices.scss';
import Footer from '../Footer/Footer';
import logo_white_288x305 from '../assets/images/logo white - 288 x 305.png';
import ServiceCard from './ServiceCard/ServiceCard';

class OurServices extends Component {
  render() {
    const webappText = 'Web apps are awesome!';
    const desktopText = 'Desktop apps are also kinda cool';
    const mobileText = 'But mobile apps are da bomb';
    const bugFixText = 'Bug fixes';
    const maintenanceText = 'Maintenance';
    const upgradeText = 'Upgrades';

    return (
      <div className="os-main-container">
        <div className="os-background-container">
          {/* This should be made into a component */}
          <div className="os-logo flex-row-start">
              <img
                className="os-logo-img os-logo-item"
                src={logo_white_288x305}
                alt="logo white - 288 x 305.png" 
                onClick={() => window.location.assign('http://localhost:3000')} />
                {/* Make this into the actual url and create an environment file */}
              <span className="heading-text white-text os-logo-item">assertive solutions <i>services</i></span>
          </div>
        </div>
        <div className="os-foreground-container">
          <div className="os-top-margin"></div>
          <div className="os-card-row">
            <ServiceCard
              colorClass="blue-card"
              type="webapp"
              text={webappText} />
            <ServiceCard
              colorClass="grey-card"
              type="desktop"
              text={desktopText} />
            <ServiceCard
              colorClass="red-card"
              type="mobile"
              text={mobileText} />
          </div>
          <div className="thats-not-all-container">
            <strong>But that's not all. We also provide the following services:</strong>
          </div>
          <div className="os-card-row">
            <ServiceCard
              colorClass="green-card"
              type="bug-fixes"
              text={bugFixText} />
            <ServiceCard
              colorClass="orange-card"
              type="maintenance"
              text={maintenanceText} />
            <ServiceCard
              colorClass="yellow-card"
              type="upgrades"
              text={upgradeText} />
          </div>
          <Footer />
        </div>   
      </div>
    );
  }
}

export default OurServices;