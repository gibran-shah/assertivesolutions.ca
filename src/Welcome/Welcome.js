import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Welcome.scss';
import '../App.scss';

class Welcome extends Component {
    
    render() {
        return (
            <section>
                <div className="anchor-container">
                    <a className="about-us-anchor" name="about-us" />
                </div>
                <div className="welcome">
                    <div className="section-heading">
                        <span className="heading-text welcome-heading">welcome to <span className="primary-text">assertive</span> <span className="secondary-text">solutions</span></span>
                    </div>
                    <div className="welcome-blurb">
                        Assertive Solutions is a business with integrity. We believe in certain core values: quality, efficiency, and our client's satisfaction. What we bring to the table is in our name: solutions. Businesses from all industries need solutions to their problems, and Assertive Solutions delivers. We listen. We listen to your pain points and design custom solutions, collaboratively with you, to meet your specific needs. Whether it's web based, desktop, or mobile apps, we have the skills and experience to deliver your solution with <span className="you">you</span> in mind.
                    </div>
                    <div className="welcome-buttons-div flex-row-space-between">
                        <button className="welcome-buttons"
                          onClick={() => this.props.history.push("/services")}>
                            Read More &nbsp;<i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                        <button className="welcome-buttons contact-us-button"
                            onClick={() => document.querySelector('[name=contact-us]').scrollIntoView({behavior:'smooth'})}>
                                Contact Us &nbsp;<i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Welcome);