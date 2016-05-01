import React, { Component } from 'react';
import SearchBar from './search-bar/index.js';
import graphqlService from '../services/graphql.js';
import { SONG_SUGGESTIONS_QUERY } from '../constants/queries.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      autocompleteOptions: [],
      selectedOption: {},
      playlist: []
    };
  }
  componentDidMount () {
    // gql query to get all tracks in the playlist
  }
  handleSearchInputChange (e) {
    if (e.key === 'Enter') {
      this.addToPlaylist();
    }
    const input = e.target.value;
    return graphqlService.query(SONG_SUGGESTIONS_QUERY, {'query': input, 'limit': 10})
      .then(json => {
        if (json.data && json.data.suggestions) {
          const suggestions = json.data.suggestions.map(song => {
            return {
              ...song,
              title: song.name + ' - ' + song.artist
            }
          });
          this.setState({autocompleteOptions: suggestions});
        }
      });
  }
  addToPlaylist () {
    this.setState({playlist: [...this.state.playlist, this.state.selectedOption]});
    // gql query to add and get back the id and new list
  }
  render () {
    return (
      <div className='container'>
        <SearchBar
          autocompleteOptions={this.state.autocompleteOptions}
          selectedOption={this.state.selectedOption}
          setSelectedOption={(selectedOption) => this.setState({selectedOption})}
          handleSearchInputChange={this.handleSearchInputChange.bind(this)}
          addToPlaylist={this.addToPlaylist.bind(this)}
        />
        <div className='container'>
          <ListGroup>
            {
              this.state.playlist.map((song, i) => {
                const num = i + 1;
                return <ListGroupItem key={i}>{num + '. ' + song.name + ' - ' + song.artist}</ListGroupItem>;
              })
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
