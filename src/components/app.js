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
      notes: Immutable.Map(),
      zIndex: 0,
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
    firebase.addNote({
      title,
      text: 'text',
      x: 0,
      y: 20,
      width: 200,
      height: 125,
      zIndex: this.state.zIndex + 1,
    });
    this.setState({
      zIndex: this.state.zIndex + 1,
    });
  }

  deleteNote(id) {
    firebase.deleteNote(id);
  }

  updateLayers(id) {
    if (this.state.zIndex !== this.state.notes.get(id).zIndex) {
      firebase.updateNoteZindex(this.state.zIndex + 1, id);
      this.setState({
        zIndex: this.state.zIndex + 1,
      });
    }
  }

  updatePosition(x, y, id) {
    firebase.updateNotePosition(x, y, id);
    this.updateLayers(id);
  }

  updateContent(text, id) {
    firebase.updateNoteContent(text, id);
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
