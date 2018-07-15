import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };

    this.handlExpandClick = this.handlExpandClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleResize = _.debounce(this.handleResize, 200);
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.setState({ collapsed: false });
    }
  }

  handlExpandClick() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderCategories() {}

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        <div className="level is-hidden-tablet">
          <button
            className="button is-light is-fullwidth"
            onClick={this.handlExpandClick}
          >
            {'[ + ] Expand menu options'}
          </button>
        </div>
        <aside
          className={`menu ${collapsed === true ? 'is-hidden-mobile' : ''}`}
        >
          <p className="menu-label">Categories</p>
        </aside>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps)(CategoryMenu);
