import React, { Component } from 'react';
import './OurClients.scss';
import AcmLogo from '../assets/images/client logos/acm logo.png';
import HAndBLogo from '../assets/images/client logos/h&b logo.png';
import AtbLogo from '../assets/images/client logos/atb logo.png';
// import ProsperusGroupLogo from '../assets/images/client logos/prosperus group logo.png';
import BodeLogo from '../assets/images/client logos/bode logo.png';
import AMILogo from '../assets/images/client logos/AMI logo.png';
import MobiltexLogo from '../assets/images/client logos/mobiltex logo.png';
import MaximusLogo from '../assets/images/client logos/maximus logo.png';

class OurClients extends Component {
    render() {
        return (
            <section>
                <div className="anchor-container">
                    <a className="our-clients-anchor" name="our-clients" />
                </div>
                <div className="our-clients-main">
                    <div className="section-heading">
                        <span className="heading-text our-clients-heading">our <span className="primary-text">clients</span></span>
                    </div>
                    <div className="our-clients-blurb">
                        Assertive Solutions has had the privilege of working for a diverse set of clients, and we have our sights set on many more.
                    </div>
                    <div className="client-list flex-row-space-around">
                        <img className="client-logo-img" src={AcmLogo} alt="ACM Facility Safety" />
                        <img className="client-logo-img" src={HAndBLogo} alt="Holland and Barnes" />
                        <img className="client-logo-img" src={AtbLogo} alt="ATB Financial" />
                        {/* <img className="client-logo-img" src={ProsperusGroupLogo} alt="Prosperus Group" /> */}
                        <img className="client-logo-img" src={BodeLogo} alt="Bode Canada" />
                        <img className="client-logo-img" src={AMILogo} alt="Advanced Measurements" />
                        <img className="client-logo-img" src={MobiltexLogo} alt="Mobiltex Data" />
                        <img className="client-logo-img" src={MaximusLogo} alt="Maximus Canada" />
                    </div>
                </div>
            </section>
        );
    }
}

export default OurClients;