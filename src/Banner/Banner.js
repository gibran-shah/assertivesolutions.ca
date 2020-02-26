import React, { Component } from 'react';
import './Banner.scss';
import '../App.scss';
import banner from '../assets/images/banner.png';
import assertiveSolutions_white_1607x393 from '../assets/images/Assertive Solutions white - 1607x393.png';
import logo_white_288x305 from '../assets/images/logo white - 288 x 305.png';
import web_desktop_mobile_app from '../assets/images/web, desktop, and mobile applications.png';

class Banner extends Component {
    
    render() {
        return (
            <section className="banner-section">
                <div className="banner-div">
                    <img className="banner-img" src={banner} alt="banner.png" />
                    <div className="white-logo-and-name flex-column-space-between">
                        <img className="white-logo-and-name-img" width="60%" src={logo_white_288x305} alt="logo white - 288 x 305.png" />
                        <img className="white-logo-and-name-img" width="100%" src={assertiveSolutions_white_1607x393} alt="Assertive Solutions white - 1607x393.png" />
                    </div>
                    <div className="web-desktop-mobile-apps">
                        <img className="web-desktop-mobile-apps-img" src={web_desktop_mobile_app} alt="web, desktop, and mobile applications.png" />
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;