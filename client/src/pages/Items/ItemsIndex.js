import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories, fetchItems } from '../../actions';

import CategoryMenu from '../../components/CategoryMenu';

class ItemsIndex extends Component {
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategories();
  }

  renderItemList() {}

  render() {
    console.log(this.props.categories);

    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <CategoryMenu />
              </div>
              <div className="column is-two-thirds" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    categories: state.categories
  };
}

export default connect(
  mapStateToProps,
  { fetchCategories, fetchItems }
)(ItemsIndex);
