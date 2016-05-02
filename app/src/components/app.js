import React, { Component } from 'react';
import SearchBar from './search-bar/index.js';
import graphqlService from '../services/graphql.js';
import { SONG_SUGGESTIONS_QUERY, PLAYLIST_QUERY } from '../constants/queries.js';
import { ADD_TRACK_MUTATION } from '../constants/mutations.js';
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
    console.log('retrieving tracks');
    return graphqlService.query(PLAYLIST_QUERY, {})
      .then(json => {
        if (json.data && json.data.playlist) {
          const playlist = json.data.playlist.map(song => {
            return {
              ...song,
              title: song.name + ' - ' + song.artist
            }
          });
          this.setState({playlist});
        }
      });
  }
  handleSearchInputChange (e) {
    if (e.key === 'Enter') { this.addToPlaylist(); }
    return graphqlService
      .query(SONG_SUGGESTIONS_QUERY, {'query': e.target.value, 'limit': 10})
      .then(json => {
        console.log('json', json);
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
    const { playlist, selectedOption } = this.state
    console.log('adding track');
    this.setState({playlist: [...playlist, selectedOption]});
    return graphqlService
      .query(ADD_TRACK_MUTATION, selectedOption)
      .then(json => {
        if (json.data && json.data.addTrack) {
          console.log('track added', json.data.addTrack.id);
        }
      })
      .catch(err => {
        console.log('err adding track', err);
      })
  }
  render () {
    const { autocompleteOptions, selectedOption } = this.state
    return (
      <div className='container'>
        <SearchBar
          autocompleteOptions     = {autocompleteOptions}
          selectedOption          = {selectedOption}
          setSelectedOption       = {(selectedOption) => this.setState({selectedOption})}
          handleSearchInputChange = {this.handleSearchInputChange.bind(this)}
          addToPlaylist           = {this.addToPlaylist.bind(this)}
        />
        <div className='container'>
          <ListGroup>
            {
              this.state.playlist.map((song, i) => {
                const num = i + 1;
                return (
                  <ListGroupItem key={i}>
                    {num + '. ' + song.name + ' - ' + song.artist}
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
