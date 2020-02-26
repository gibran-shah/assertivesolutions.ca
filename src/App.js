import React, { Component } from 'react';
import './App.scss';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Welcome from './Welcome/Welcome';
import MainFocus from './MainFocus/MainFocus';
import WhatWeDo from './WhatWeDo/WhatWeDo';
import OurBlog from './OurBlog/OurBlog';
import OurClients from './OurClients/OurClients';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import smoothscroll from 'smoothscroll-polyfill';

class App extends Component {

  render() {

    smoothscroll.polyfill();

    return (
      <div>
        <Header />
        <Banner />
        <Welcome />
        <MainFocus />
        <WhatWeDo />
        <OurBlog />
        <OurClients />
        <ContactUs />
        <Footer />
      </div>
    );
  }
}

export default App;
