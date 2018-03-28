import React, { Component } from 'react';
import {app as fbApp} from './firebase-config.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    fbApp.database().ref().on('child_added', snapshot => {
      this.setState({[snapshot.key]: snapshot.val()});
    });
  }
  render() {
    return JSON.stringify(this.state, null, 2);
  }
}

export default App;
