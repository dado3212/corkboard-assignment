import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: this.props.note.text,
    };

    // Binding statements
    this.onInputChange = this.onInputChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  onDeleteClick(event) {
    this.props.delete();
  }

  onEditClick(event) {
    this.props.updateContent(this.state.text);
    this.setState({ isEditing: !this.state.isEditing });
  }

  onDrag(event, ui) {
    this.props.updatePosition(ui.x, ui.y);
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
        <div className="content">
          <Textarea onChange={this.onInputChange}>
            {this.state.text}
          </Textarea>
        </div>
      );
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.state.text) }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".fa-arrows-alt"
        defaultPosition={null}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
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
          {this.renderContent()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
