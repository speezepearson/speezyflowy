import { Component } from 'react';

class FirebaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  definedEntries() {
    return Object.entries(this.state).filter(([k, v]) => (v !== undefined));
  }
  componentWillMount() {
    this.refUpdateFn = (snapshot => {
      this.setState({[snapshot.key]: snapshot.val()});
    });
    this.refRemoveFn = (snapshot => {
      this.setState({[snapshot.key]: undefined});
    });
    this.props.fbRef.on('child_changed', this.refUpdateFn);
    this.props.fbRef.on('child_added', this.refUpdateFn);
    this.props.fbRef.on('child_removed', this.refRemoveFn);
  }
  componentWillUnmount() {
    this.props.fbRef.off('child_changed', this.refUpdateFn);
    this.props.fbRef.off('child_added', this.refUpdateFn);
    this.props.fbRef.off('child_removed', this.refRemoveFn);
  }

}

export default FirebaseComponent;
