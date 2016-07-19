import React, { Component } from 'react';
import Immutable from 'immutable';

// All component imports
import NoteAdder from './note_adder';
import Note from './note';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({
        0: {
          title: 'Title',
          text: '### This is ~text~!',
          x: 0,
          y: 0,
          zIndex: 0,
        },
      }),
      id: 1,
    };
  }

  createNote(title) {
    this.setState({
      notes: this.state.notes.set(this.state.id, {
        title,
        text: 'text',
        x: 0,
        y: 0,
        zIndex: 0,
      }),
      id: this.state.id + 1,
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updatePosition(x, y, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    });
  }

  updateContent(text, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
    });
  }

  allNotes() {
    return this.state.notes.map((key, value) => {
      return <Note note={key} delete={() => this.deleteNote(value)} updatePosition={(x, y) => this.updatePosition(x, y, value)} updateContent={(text) => this.updateContent(text, value)} />;
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
