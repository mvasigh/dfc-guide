import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  renderCategories() {
    const categories = _.filter(
      this.props.categories,
      cat => cat.items.length > 0
    );
    return _.map(categories, cat => (
      <li key={cat._id}>
        <Link to={`/categories/${cat._id}`}>{`${cat.name} (${
          cat.items.length
        })`}</Link>
      </li>
    ));
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        <div className="level is-hidden-tablet">
          <button
            className="button is-light is-fullwidth"
            onClick={this.handlExpandClick}
          >
            {collapsed
              ? '[ + ] Expand menu options'
              : '[ - ] Collapse menu options'}
          </button>
        </div>
        <aside
          className={`menu ${collapsed === true ? 'is-hidden-mobile' : ''}`}
        >
          <p className="menu-label">Categories</p>
          <ul className="menu-list">{this.renderCategories()}</ul>
        </aside>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps)(CategoryMenu);
