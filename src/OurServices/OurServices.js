import React, { Component } from 'react';
import './OurServices.scss';
import Footer from '../Footer/Footer';
import logo_white_288x305 from '../assets/images/logo white - 288 x 305.png';
import ServiceCard from './ServiceCard/ServiceCard';

class OurServices extends Component {
  render() {
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
          <ServiceCard colorClass="blue-card" type="webapp" />
          <ServiceCard colorClass="grey-card" type="desktop" />
          <ServiceCard colorClass="red-card" type="mobile" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default OurServices;