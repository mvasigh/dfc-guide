import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import logo from '../logo.svg';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleMenuClick() {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
  }

  handleMenuItemClick() {
    this.setState({ expanded: false });
  }

  render() {
    return (
      <nav
        className="navbar is-fixed-top is-shadowless is-info"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item dfc-logo-container" to="/">
              <img alt="Doctors for Change" src={logo} />
            </Link>
            <span className="navbar-item">
              <SearchForm />
            </span>
            <a
              role="button"
              className="navbar-burger has-text-white"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.handleMenuClick}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            className={`navbar-menu ${this.state.expanded ? 'is-active' : ''}`}
          >
            <div className="navbar-start" />
            <div className="navbar-end">
              <Link
                onClick={this.handleMenuItemClick}
                className="navbar-item"
                to="/items"
              >
                Community Resources
              </Link>
              <Link
                onClick={this.handleMenuItemClick}
                className="navbar-item"
                to="/guides"
              >
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
  }
}

export default Navbar;
