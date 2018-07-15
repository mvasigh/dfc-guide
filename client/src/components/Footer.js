import React from 'react';
import logo from '../logo.svg';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer has-background-light">
      <div className="container">
        <div className="content has-text-centered has-text-grey">
          <Logo
            height={100}
            width={100}
            style={{ paddingBottom: '10px' }}
            fill="#7a7a7a"
          />
          <p>
            Copyright © 2018 Doctors for Change
            <br />
            <a href="https://doctorsforchange.org" className="has-text-grey">
              www.DoctorsForChange.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
