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

    const maintenanceText = <>Once we've built your software to your full satisfaction,
      we will still be there for you. We believe not only in delivering the product,
      but ensuring that it continues to bring value to your business in the long haul.
      Therefore, we're happy to stay on the team for as long as you need us─for
      as long as your software needs maintenance, improvements, or adaptation to your
      evolving business in any way. Let's make sure your software continues to delivering
      the value your business requires for as long as possible.</>;

    const bugFixText = <>Already have a custom built software application? Wish you could squash all the bugs?
      Improve performance? Seal up all the cracks and holes? No worries. We're up to the challenge.
      We would be happy to take on any flaws, performance issues, and bugs your software may suffer from.
      As long as you have access to the source code (the code written by the original programmers),
      we can fix any of its defects. Don't settle for software that's less than what you originally envisioned.
      Let us help you bring your vision to complete fruition.</>;

    const upgradeText = <>A part of bug fixes and maintenance is ensuring your software
      gets timely upgrades to stay compatible with other upgrades. For example, upgrading
      from Windows 10 to Windows 11 may require upgrades to the software we built for you.
      But it's not just the software we built for you─we'll help upgrade any software your
      business depends on─whether that's to the latest operating system, to commercial software,
      or even hardware upgrades. Upgrades can be scary─let us put you at ease by doing
      the work for you.</>;

    return (
      <div className="os-main-container">
        <div className="os-background-container">
          {/* This should be made into a component */}
          <div className="os-logo flex-row-start">
              <img
                className="os-logo-img os-logo-item"
                src={logo_white_288x305}
                alt="logo white - 288 x 305.png"
                onClick={() => window.location.assign('http://www.assertivesolutions.ca')} />
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
              type="maintenance"
              text={maintenanceText} />
            <ServiceCard
              colorClass="blue-card"
              type="bug-fixes"
              text={bugFixText} />
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}

export default OurServices;