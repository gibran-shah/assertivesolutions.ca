// Taken from https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideMenu.scss';

export default props => {
  const menuItemClick = (sectionName) => {
    const section = document.querySelector(`[name=${sectionName}]`);
    if (section) {
      section.scrollIntoView({behavior:'smooth'});
    }
  };

  return (
    <Menu>
      <a className="menu-item" onClick={() => menuItemClick('banner')}>
        Home
      </a>
      <a className="menu-item" onClick={() => menuItemClick('about-us')}>
        About Us
      </a>
      <a className="menu-item" onClick={() => menuItemClick('our-focus')}>
        Our Focus
      </a>
      <a className="menu-item" onClick={() => menuItemClick('what-we-do')}>
        What We Do
      </a>
      <a className="menu-item" onClick={() => menuItemClick('our-blog')}>
        Our Blog
      </a>
      <a className="menu-item" onClick={() => menuItemClick('our-clients')}>
        Our Clients
      </a>
      <a className="menu-item" onClick={() => menuItemClick('contact-us')}>
        Contact Us
      </a>
    </Menu>
  );
};



{/* <li onClick={() => document.querySelector('[name=home]').scrollIntoView({behavior:'smooth'})}>Home</li>
<li onClick={() => document.querySelector('[name=about-us]').scrollIntoView({behavior:'smooth'})}>About Us</li>
<li onClick={() => document.querySelector('[name=our-focus]').scrollIntoView({behavior:'smooth'})}>Our Focus</li>
<li onClick={() => document.querySelector('[name=what-we-do]').scrollIntoView({behavior:'smooth'})}>What We Do</li>
<li onClick={() => document.querySelector('[name=our-blog]').scrollIntoView({behavior:'smooth'})}>Our Blog</li>
<li onClick={() => document.querySelector('[name=our-clients]').scrollIntoView({behavior:'smooth'})}>Our Clients</li>
<li onClick={() => document.querySelector('[name=contact-us]').scrollIntoView({behavior:'smooth'})}>Contact Us</li> */}