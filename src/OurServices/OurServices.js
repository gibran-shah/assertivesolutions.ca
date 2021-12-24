import React, { Component } from 'react';
import './OurServices.scss';
import Footer from '../Footer/Footer';
import logo_white_288x305 from '../assets/images/logo white - 288 x 305.png';
import ServiceCard from './ServiceCard/ServiceCard';

class OurServices extends Component {
  render() {
    const webappText = <>Web applications are essential to any successful business.
      They are so much more than just a web site. Web applications allow visitors to
      create accounts, save information, see your inventory, see <i>new</i> inventory
      (without updating the web application), make purchases and place orders, and so much more.
      We can have your web application designed, built, and go live in only months (if not weeks)
      at a competitive price.</>;

    const desktopText = <>Desktop applications can do everything web applications do
      plus the ability to use them offline. Microsoft Word and Excel are desktop applications.
      So are email clients like Outlook. While they can't be accessed from anywhere,
      you have the security of knowing they can't be accessed unless you're at your computer.
      But that doesn't mean they can't reach out. A custom desktop application
      can be built and installed on all your office computers. And with a database
      and server running on your network, the application can talk to various points on your network
      while being protected by a secure firewall. If that sounds like the right solution for your business,
      consider having one costum built for you.</>;

    const mobileText = <>Mobile apps, like the ones on your iPhone or Android,
      are great for those on the go or who prefer to travel light. Because mobile apps
      run on your phone (or any device that's small and light), there is no need to stay fixed at your desk
      or lug around a heavy laptop. And the best part is, mobile devices can connect you to anywhere
      from anywhere─whether you're connected through wifi or data─so you can have lunch at the park
      while checking your email or surfing the web─or connecting through any app we build for you
      right on your device!</>;
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
              colorClass="red-card"
              type="bug-fixes"
              text={bugFixText} />
            <ServiceCard
              colorClass="blue-card"
              type="maintenance"
              text={maintenanceText} />
            <ServiceCard
              colorClass="grey-card"
              type="upgrades"
              text={upgradeText} />
          </div>
          <div className="os-bottom-margin"></div>
          <Footer />
        </div>   
      </div>
    );
  }
}

export default OurServices;