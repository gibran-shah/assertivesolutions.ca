import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './MainFocus.scss';
import '../App.scss';
import MainFocusImg from '../assets/images/main focus.png';
//import OurMainFocusAreas from '../assets/images/our main focus areas.png';

class MainFocus extends Component {
    
    render() {
        return (
            <section>
                <div className="anchor-container">
                    <a className="our-focus-anchor" name="our-focus" />
                </div>
                <div className="our-main-focus-areas">
                    <div className="main-focus flex-column-center">
                        <img className="main-focus-img" src={MainFocusImg} alt="main focus.png" />
                    </div>
                    <div className="main-focus-list flex-column-center">
                        <span className="heading-text main-focus-heading">our main <span className="primary-text">focus</span> <span className="secondary-text">areas</span></span>
                        <span className="flex-item">Assertive Solutions is proud to boast a wide breadth of focus areas. Our primary areas of focus are:</span>
                        <ul>
                            <li><i className="far fa-arrow-alt-circle-right"></i> Software Development</li>
                            <li><i className="far fa-arrow-alt-circle-right"></i> Mobile Applications</li>
                            <li><i className="far fa-arrow-alt-circle-right"></i> Web Applications</li>
                            <li><i className="far fa-arrow-alt-circle-right"></i> Desktop Applications</li>
                        </ul>
                        <div>
                            <button className="flex-item"
                              onClick={() => this.props.history.push("/services")}>
                                Read More &nbsp;<i className="fas fa-arrow-alt-circle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(MainFocus);