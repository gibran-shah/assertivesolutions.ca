import React, { Component } from 'react';
import './Header.scss';
import '../App.scss';
import logo from '../assets/images/logo.png';
import assertiveSolutions_SVG_163x38 from '../assets/images/assertive solutions 163x38.svg';
import ContactMethod from './ContactMethod/ContactMethod';

class Header extends Component {
    
    render() {
        return (
            <section>
                <a name="home" />
                <div className="header-main flex-row-space-between">
                        
                    <div className="logo-name flex-row-start">
                        <div className="flex-column-center">
                            <img className="logo-img" src={ logo } alt="logo.png" />
                        </div>
                        <div className="spacer">{/* spacer */}</div>
                        <div className="flex-column-center">
                            {/* <img className="logo-text" src={ assertiveSolutions_SVG_163x38 } alt="assertive solutions 163x38.svg" /> */}
                            {/* <ReactSVG src={ assertiveSolutions_SVG_163x38 } /> */}
                            <object id="E" type="image/svg+xml" data={ assertiveSolutions_SVG_163x38 } className="logo-text">
                                <param name="src" value={ assertiveSolutions_SVG_163x38 } />
                            </object>
                        </div>
                    </div>

                    <div className="contact-search-menu flex-column-space-between">
                        <div className="contact-methods flex-row-space-between">
                            <ContactMethod methodType={'phone'} />
                            <ContactMethod methodType={'email'} />
                            <ContactMethod methodType={'search'} />
                            {/* <div className="gcse-search"></div> */}
                        </div>
                        <div>
                            <ul className="menu">
                                <li onClick={() => document.querySelector('[name=banner]').scrollIntoView({behavior:'smooth'})}>Home</li>
                                <li onClick={() => document.querySelector('[name=about-us]').scrollIntoView({behavior:'smooth'})}>About Us</li>
                                <li onClick={() => document.querySelector('[name=our-focus]').scrollIntoView({behavior:'smooth'})}>Our Focus</li>
                                <li onClick={() => document.querySelector('[name=what-we-do]').scrollIntoView({behavior:'smooth'})}>What We Do</li>
                                <li onClick={() => document.querySelector('[name=our-blog]').scrollIntoView({behavior:'smooth'})}>Our Blog</li>
                                <li onClick={() => document.querySelector('[name=our-clients]').scrollIntoView({behavior:'smooth'})}>Our Clients</li>
                                <li onClick={() => document.querySelector('[name=contact-us]').scrollIntoView({behavior:'smooth'})}>Contact Us</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

export default Header;