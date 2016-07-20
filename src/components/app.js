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
          y: 15,
          width: 300,
          height: 150,
          zIndex: 0,
        },
      }),
      id: 1,
      zIndex: 0,
    };
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
