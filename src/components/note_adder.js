import React, { Component } from 'react';

class NoteAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  addNote(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.create(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <form id="note-adder" onSubmit={this.addNote}>
        <input placeholder="new note title" onChange={this.onInputChange} value={this.state.title} />
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default NoteAdder;
