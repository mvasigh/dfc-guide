import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchItem } from '../../actions';

import CategoryMenu from '../../components/CategoryMenu';
import ItemCard from '../../components/ItemCard';

class ItemsShow extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;
    this.props.fetchItem(itemId);
    this.props.fetchCategories();
  }

  handleCategoryClick(e) {
    this.props.history.push({
      pathname: '/items',
      state: {
        filter: e.target.id
      }
    });
  }

  renderItemDetail() {
    const { item } = this.props;
    if (item) {
      return (
        <div className="box">
          <p className="subtitle is-6 dfc-category-label">
            {item.category.name}
          </p>
          <p className="title is-5">{item.title}</p>
          {/* <div className="tags">{renderTags(tags)}</div> */}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      );
    }
  }

  renderRelatedItems() {
    if (this.props.item && this.props.item.relatedItems) {
      const { relatedItems } = this.props.item;
      return relatedItems.map(item => (
        <div key={item._id} className="column is-half">
          <ItemCard
            id={item._id}
            title={item.title}
            description={item.description}
            category={item.category.name}
            tags={item.tags}
          />
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="dfc-page-container">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <CategoryMenu onCategoryClick={this.handleCategoryClick} />
              </div>
              <div className="column is-two-thirds">
                {this.renderItemDetail()}
                <p className="title is-4">Related items:</p>
                <div className="columns is-multiline">
                  {this.renderRelatedItems()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ items }, ownProps) {
  const { itemId } = ownProps.match.params;
  return { items, item: items[itemId] };
}

export default connect(
  mapStateToProps,
  { fetchCategories, fetchItem }
)(ItemsShow);
