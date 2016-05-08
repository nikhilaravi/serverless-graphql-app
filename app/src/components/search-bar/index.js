import React, { Component, PropTypes } from 'react';
var Typeahead = require('react-typeahead').Typeahead;

require('./styles.css');

export default class SearchBar extends Component {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.refs.autocomplete.setState({ entryValue: '' }); // temp fix to clear the search input
    this.props.addToPlaylist();
  }
  render () {
    return (
      <div className='container searchBarContainer'>
          <Typeahead
            ref='autocomplete'
            options={this.props.autocompleteOptions}
            className='inputBar'
            onKeyUp={(e) => {
              if (e.key === 'Enter') { this.handleClick(); }
              this.props.handleSearchInputChange(e);
            }}
            filterOption='name'
            displayOption='title'
            onOptionSelected={this.props.setSelectedOption}
            maxVisible={5}
            customClasses={{
              input: 'form-control',
              results: 'list-group input-results',
              listItem: 'list-group-item',
              hover: 'list-group-item__hover active'
            }}
          />
          <div
            className='searchButton'
            onClick={this.handleClick}
          >
           Add Track
          </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  addToPlaylist: PropTypes.func,
  autocompleteOptions: PropTypes.array,
  handleSearchInputChange: PropTypes.func,
  setSelectedOption: PropTypes.func
};
