import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      class="navbar is-fixed-top is-shadowless is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item dfc-logo-container" to="/home">
            DFC
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start" />
          <div className="navbar-end">
            <Link className="navbar-item" to="/items">
              Community Resources
            </Link>
            <Link className="navbar-item" to="/guides">
              Guide Book
            </Link>
            <a
              className="navbar-item"
              href="https://docs.google.com/forms/d/1V5ySudx03DRinmNHCm6EfKWXnPa1GJAyVxaZcO5Miy0/viewform"
            >
              Feedback
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
