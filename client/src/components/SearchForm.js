import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { term } = this.state;
    this.props.history.push(`/items?search=${term}`);
    this.setState({ term: '' });
  }

  render() {
    const size = this.props.large ? 'is-medium' : '';

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="text"
              className={`input ${size} is-rounded`}
              placeholder="Search the Guide..."
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
            <span className={`icon is-left ${size}`}>
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchForm);
