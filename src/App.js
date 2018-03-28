import React, { Component } from 'react';
import {app as fbApp} from './firebase-config.js';
import Node from './Node';

const user = {
  uid: '__sample__',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootNodeId: null,
    }
    this.userInfoRef = fbApp.database().ref(`users/${user.uid}`);
    this.rootNodeIdRef = this.userInfoRef.child('rootNodeId');
    this.rootNodeIdRef.on('value', id => {
      console.log('rootNodeId value changed:', id);
      this.setState({rootNodeId: id});
    });
  }
  initializeTree() {
    this.userInfoRef.child('nodes').push({
      text: '',
      childIds: {},
    }).then(ref => {
      this.rootNodeIdRef.set(ref.key);
    });
  }
  render() {
    console.log('rendering App with state', this.state)
    if (this.state.rootNodeId) {
      return <Node fbRef={this.rootNodeIdRef.parent.child(`tree/${this.rootNodeId}`)} />;
    } else {
      return <button onClick={this.initializeTree.bind(this)}>Initialize</button>;
    }
  }
}

export default App;
