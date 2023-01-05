import React, { Component } from 'react';
import './App.scss';
import './Home.scss';
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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Blog from './Blog/blog';
import OurServices from './OurServices/OurServices';
import SideMenu from './SideMenu/SideMenu';

class App extends Component {

  render() {

    smoothscroll.polyfill();

    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="app-master-container">
              <SideMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              <div className="header"><Header /></div>
              <Banner />
              <Welcome />
              <MainFocus />
              <WhatWeDo />
              <OurBlog />
              <OurClients />
              <ContactUs />
              <Footer />
            </div>
          </Route>
          <Route path="/blog" exact>
            <Blog/>
          </Route>
          <Route path="/services" exact>
            <OurServices/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
