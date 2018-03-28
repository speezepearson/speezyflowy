import React from 'react';
import FirebaseComponent from './FirebaseComponent';

class Node extends FirebaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      childIds: {},
      text: '',
      unfurled: true,
    };
  }
  hasChildren() {
    return Object.keys(this.state.childIds).length !== 0;
  }
  render() {
    return <div>
      <span
        style={{cursor: this.hasChildren() ? 'pointer' : 'move'}}
        onClick={() => this.setState({unfurled: !this.state.unfurled})}
      >
        {!this.hasChildren() ? '●'
         : this.state.unfurled ? '▼'
         : '▶'}
      </span>
      <input
        type="text"
        value={this.state.text}
        onInput={e => {this.props.fbRef.update({text: e.target.value})}}
        ></input>
      <button onClick={() => {
        this.props.fbRef.parent.push({
          text: '',
          childIds: {},
          unfurled: true,
        }).then(ref => {
          this.props.fbRef.child('childIds').update({[ref.key]: true});
        })}
      }>
        +Child
      </button>
      {this.state.unfurled
        ?
        <div style={{margin: '0 0 0 1em'}}>
          {
            Object.keys(this.state.childIds).map(id => (
              <Node
                key={id}
                fbRef={this.props.fbRef.parent.child(id)}
              />
            ))
          }
        </div>
        : ''
      }
    </div>
  }
}

export default Node;
