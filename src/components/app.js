import React, { Component } from 'react';
import Immutable from 'immutable';

// All component imports
import NoteAdder from './note_adder';
import Note from './note';

// Firebase import
import firebase from './firebase';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({
        0: {
          title: 'Hello!',
          text: '![](https://media.giphy.com/media/xT0BKpqAaJczduXXJ6/giphy.gif)',
          x: 0,
          y: 25,
          width: 300,
          height: 185,
          zIndex: 0,
        },
        1: {
          title: 'Resize me!',
          text: 'Drag from any of my sides or corners!',
          x: 410,
          y: 50,
          width: 300,
          height: 175,
          zIndex: 1,
        },
        2: {
          title: 'Drag me!',
          text: 'Just grab my thumbtack to pull me around!  Don\'t worry, I\'ll stay in front of the other post-its while you\'re working with me!',
          x: 600,
          y: 250,
          width: 300,
          height: 180,
          zIndex: 2,
        },
      }),
      id: 3,
      zIndex: 2,
    };
  }

  componentDidMount() {
    firebase.fetchNotes((snapshot) => {
      this.setState({
        notes: Immutable.Map(snapshot.val()),
      });
    });
  }

  createNote(title) {
    this.setState({
      notes: this.state.notes.set(this.state.id, {
        title,
        text: 'text',
        x: 0,
        y: 20,
        width: 200,
        height: 125,
        zIndex: this.state.zIndex + 1,
      }),
      id: this.state.id + 1,
      zIndex: this.state.zIndex + 1,
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updateLayers(id) {
    if (this.state.zIndex !== this.state.notes.get(id).zIndex) {
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { zIndex: this.state.zIndex + 1 });
        }),
        zIndex: this.state.zIndex + 1,
      });
    }
  }

  updatePosition(x, y, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    });
    this.updateLayers(id);
  }

  updateContent(text, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
    });
  }

  updateSize(width, height, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { width, height }); }),
    });
  }

  allNotes() {
    return this.state.notes.map((note, id) => {
      return (<Note
        note={note}
        delete={() => this.deleteNote(id)}
        updatePosition={(x, y) => this.updatePosition(x, y, id)}
        updateContent={(text) => this.updateContent(text, id)}
        updateSize={(width, height) => this.updateSize(width, height, id)}
        updateLayers={() => this.updateLayers(id)}
      />);
    });
  }

  render() {
    return (
      <div>
        <NoteAdder create={(title) => this.createNote(title)} />
        {this.allNotes()}
      </div>
    );
  }
}

export default App;
