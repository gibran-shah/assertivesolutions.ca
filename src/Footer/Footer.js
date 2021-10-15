import React, { Component } from 'react';
import './Footer.scss';
import footerSwish from '../assets/images/footer swish.png';
import AssertiveSolutionsLogo from '../assets/images/logo.png';
import AssertiveSolutionsFooter from '../assets/images/assertive solutions footer.png';

// https://business.linkedin.com/marketing-solutions
// https://business.linkedin.com/marketing-solutions/linkedin-pages?src=&veh=_src._c._pkw.%2Blinkedin%20%2Bbusiness%20%2Baccount_pmt.p_pcrid._pdv.c_plc._trgid.kwd-80401972829831:loc-32_net.o_learning&trk=_src._c._pkw.%2Blinkedin%20%2Bbusiness%20%2Baccount_pmt.p_pcrid._pdv.c_plc._trgid.kwd-80401972829831:loc-32_net.o_learning&mcid=6612427885674319877&cname=LMS_NAMER_Core_USCA_Search_Bing-Brand_DR-PRS_Broad_Pages-Beta_All_English_Core&camid=372285570&asid=1286428899619944&targetid=kwd-80401972829831:loc-32&crid=&placement=&dev=c&ends=1&gclid=aae8b009412418d22bdbd11ca37f61a8&gclsrc=3p.ds&msclkid=aae8b009412418d22bdbd11ca37f61a8&utm_source=bing&utm_medium=cpc&utm_campaign=LMS-S_NAMER_USCA_High_EN-US_SEM_SEM_MSA_NA_All_NA_NA_Core_NA_Pages_Brand_Phrase&utm_term=%2Blinkedin%20%2Bbusiness%20%2Baccount&utm_content=Business%20Page%20-%20linkedin%20business%20account

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
                          <a target="_blank" href="https://www.facebook.com/Assertive-Solutions-Inc-729853577771300">
                            <i className="fab fa-facebook-square"></i>
                          </a>
                          <a target="_blank" href="https://linkedin.com/company/assertivesolutionsinc">
                            <i className="fab fa-linkedin"></i> {/* Email from linkedin support: Aug 19 in gibran.shah@gmail.com */}
                          </a>
                          {/* <a target="_blank" href="https://twitter.com/AssertiveInc"> */}
                          <a target="_blank" href="https://twitter.com/assertive_care">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;