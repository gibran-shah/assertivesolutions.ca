import React, { Component } from 'react';
import '../App.scss';
import './WhatWeDo.scss';
import WhatWeDoBackground from '../assets/images/what we do background.png';
//import WhatWeDoText from '../assets/images/what we do.png';
import WhatWeDoPhone from '../assets/images/what we do phone.png';

class WhatWeDo extends Component {
    render() {
        return (
            <section>
                <div className="what-we-do-main">
                    <img className="what-we-do-background" src={WhatWeDoBackground} alt="what we do background.png" />
                    <div className="what-we-do-foreground flex-row-space-around">
                        <div className="what-we-do-blurb-and-button flex-column-center">
                            <div className="anchor-container">
                                <a className="what-we-do-anchor" name="what-we-do" />
                            </div>
                            <div className="what-we-do-heading">
                                <span className="white-text">what we do</span>
                            </div>
                            <span className="what-we-do-blurb">
                                We solve problems. We listen to your pain points and collaboratively design technical solutions in the former of custom software.
                                Our main focus areas are web, desktop, and mobile applications, but we also do bug fixes, revamp existing software, and offer consulting services.
                            </span>
                            <button className="what-we-do-button"
                              onClick={() => window.location.href = 'http://localhost:3000/services'}>
                                Our Services &nbsp;<i className="fas fa-arrow-alt-circle-right"></i>
                            </button>
                        </div>
                        <div className="what-we-do-phone">
                            <img className="what-we-do-phone-img" src={WhatWeDoPhone} alt="what we do phone.png" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default WhatWeDo;