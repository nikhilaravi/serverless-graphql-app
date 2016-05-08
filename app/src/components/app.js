import React, { Component } from 'react';
import SearchBar from './search-bar/index.js';
import graphqlService from '../services/graphql.js';
import { SONG_SUGGESTIONS_QUERY, PLAYLIST_QUERY } from '../constants/queries.js';
import { ADD_TRACK_MUTATION } from '../constants/mutations.js';
import { ListGroup, ListGroupItem, Col, PageHeader } from 'react-bootstrap';
import './styles.css';
var playIcon = require('../assets/play.png');
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
        <PageHeader>Serverless GraphQL Playlist</PageHeader>
        <SearchBar
          autocompleteOptions     = {autocompleteOptions}
          selectedOption          = {selectedOption}
          setSelectedOption       = {(selectedOption) => this.setState({selectedOption})}
          handleSearchInputChange = {this.handleSearchInputChange.bind(this)}
          addToPlaylist           = {this.addToPlaylist.bind(this)}
        />
        <div className='container playlist'>
          <ListGroup>
            {
              this.state.playlist.map((song, i) => {
                return (
                  <div key={i} className='playlistItem'>
                    <Col xs={1} md={2} mdOffset={1} >
                      <img className='songImage' src={song.imageUrl} responsive/>
                    </Col>
                    <Col xs={8} md={6} >
                      <h3 className='songName'>{song.name}</h3>
                      <h4 className='songArtist'>{song.artist}</h4>
                    </Col>
                    <Col xs={1} md={1} >
                      <a href={song.url}><img className='playIcon' src={playIcon}/></a>
                    </Col>
                  </div>
                )
              })
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
