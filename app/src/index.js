import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
  render () {
    return (
      <h1>HELLO SERVERLESS WORLD WELCOME!</h1>
    );
  }
}

ReactDOM.render(<Home />, document.body);
