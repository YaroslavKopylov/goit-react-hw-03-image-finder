import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSearchSubmit = e => {
    const value = e.currentTarget.value.toLowerCase();
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') return;
    const { value } = this.state;
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <>
        <header>
          <form onSubmit={this.handleSubmit}>
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              value={this.state.value}
              onChange={this.handleSearchSubmit}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
