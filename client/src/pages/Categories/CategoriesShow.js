import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories, fetchItems } from '../../actions';

import CategoryMenu from '../../components/CategoryMenu';
import ItemsList from '../../components/ItemsList';

class CategoriesShow extends Component {
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategories();
  }

  renderItemList() { }

  render() {
    return (
      <div className="dfc-page-container">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <CategoryMenu />
              </div>
              <div className="column is-two-thirds">
                <ItemsList items={this.props.items} />
              </div>
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
)(CategoriesShow);
