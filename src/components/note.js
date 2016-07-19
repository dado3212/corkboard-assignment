import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    // Binding statements
    this.onInputChange = this.onInputChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onInputChange(event) {
    this.setState({ searchterm: event.target.value });
  }

  onDeleteClick(event) {
    this.props.delete();
  }

  onEditClick(event) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return <i onClick={this.onEditClick} className="fa fa-check" />;
    } else {
      return <i onClick={this.onEditClick} className="fa fa-pencil" />;
    }
  }

  renderContent() {
    if (this.state.isEditing) {
      return (
        <textarea>
          {this.props.note.text}
        </textarea>
      );
    } else {
      return this.props.note.text;
    }
  }

  render() {
    return (
      <Draggable
        handle=".fa-arrows-alt"
      >
        <div className="note">
          <div className="navbar">
            <div className="left">
              <span className="title">{this.props.note.title}</span>
              <i onClick={this.onDeleteClick} className="fa fa-trash-o" />
              {this.renderEditButton()}
            </div>
            <div className="right">
              <i className="fa fa-arrows-alt" />
            </div>
          </div>
          <div className="content">
          {this.renderContent()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
