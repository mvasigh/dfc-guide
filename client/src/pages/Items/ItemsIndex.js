import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories, fetchItems } from '../../actions';

import CategoryMenu from '../../components/CategoryMenu';
import ItemsList from '../../components/ItemsList';

class ItemsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterCategoryName: ''
    };

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategories();

    if (this.props.location.state) {
      this.setState({ filterCategoryName: this.props.location.state.filter });
    }
  }

  renderItemList() {
    if (this.state.filterCategoryName === '') {
      return <ItemsList items={this.props.items} />;
    } else {
      const filteredItems = _.filter(
        this.props.items,
        item => item.category.name === this.state.filterCategoryName
      );
      return <ItemsList items={filteredItems} />;
    }
  }

  handleCategoryClick(e) {
    const filterCategoryName = e.target.id;
    this.setState({ filterCategoryName });
  }

  render() {
    return (
      <div className="dfc-page-container">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <CategoryMenu
                  active={this.state.filterCategoryName}
                  onCategoryClick={this.handleCategoryClick}
                />
              </div>
              <div className="column is-two-thirds">
                {this.renderItemList()}
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
)(ItemsIndex);
