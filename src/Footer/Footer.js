import React, { Component } from 'react';
import './Footer.scss';
import footerSwish from '../assets/images/footer swish.png';
import AssertiveSolutionsLogo from '../assets/images/logo.png';
import AssertiveSolutionsFooter from '../assets/images/assertive solutions footer.png';

class Footer extends Component {
    render() {
        return (
            <section>
                <div className="footer-main">
                    <div className="footer-swish" />
                    <div className="flex-column-space-around footer-content">
                        <img className="footer-logo-img footer-item" src={AssertiveSolutionsLogo} alt="logo.png" />
                        <img className="assertive-solutions footer-item" src={AssertiveSolutionsFooter} alt="assertive solutions footer.png" />
                        <div className="social-media flex-row-space-around footer-item">
                          <a href="https://www.facebook.com/Assertive-Solutions-Inc-729853577771300">
                            <i className="fab fa-facebook-square"></i>
                          </a>
                          <a href="#">
                            <i className="fab fa-linkedin"></i>
                          </a>
                          <a href="#">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;