import React, { Component, PropTypes } from 'react';
var Typeahead = require('react-typeahead').Typeahead;

require('./styles.css');

export default class SearchBar extends Component {
  render () {
    return (
      <div className='tagWrapper'>
        <div className='tagContainer'>
        <div className='inputContainer'>
          <Typeahead
            ref="autocomplete"
            options={this.props.autocompleteOptions}
            className='inputBar'
            onKeyUp={this.props.handleSearchInputChange}
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
            onClick={() => {
              this.refs.autocomplete.setState({ entryValue: '' }); // temp fix to clear the search input
              this.props.addToPlaylist();
            }}
          >
           Add to playlist
          </div>
        </div>
      </div>
    </div>
    );
  }
}
