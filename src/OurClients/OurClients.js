import React, { Component } from 'react';
import './OurClients.scss';
import ClientLink from './ClientLink/ClientLink';
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
                        <ClientLink link="http://www.acm.ca" logo={AcmLogo} altTest="ACM Facility Safety" />
                        <ClientLink link="https://www.hollandandbarnes.com/" logo={HAndBLogo} altTest="Holland and Barnes" />
                        <ClientLink link="https://www.atb.com/" logo={AtbLogo} altTest="ATB Financial" />
                        <ClientLink link="https://www.bode.ca/" logo={BodeLogo} altTest="Bode Canada" />
                        <ClientLink link="https://www.linkedin.com/company/advanced-measurements-inc./?originalSubdomain=ca" logo={AMILogo} altTest="Advanced Measurements" />
                        <ClientLink link="https://www.mobiltex.com" logo={MobiltexLogo} altTest="Mobiltex" />
                        <ClientLink link="https://www.maximuscanada.ca/" logo={MaximusLogo} altTest="Maximus Canada" />
                    </div>
                </div>
            </section>
        );
    }
}

export default OurClients;