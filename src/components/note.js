import React, { Component } from 'react';
import marked from 'marked';
import ResizableAndMovable from 'react-resizable-and-movable';

class Note extends Component {
  constructor(props) {
    super(props);

    // Binding statements
    this.onInputChange = this.onInputChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onInputChange(event) {
    this.props.updateContent(event.target.value);
  }

  onDeleteClick(event) {
    this.props.delete();
  }

  onEditClick(event) {
    this.props.updateEditing(!this.props.note.isEditing);
  }

  onDrag(event, ui) {
    this.props.updatePosition(ui.position.left, ui.position.top);
  }

  onResize(event, ui) {
    this.props.updateSize(ui.width, ui.height);
  }

  onClick(event) {
    this.props.updateLayers();
  }

  renderEditButton() {
    if (this.props.note.isEditing) {
      return <i onClick={this.onEditClick} className="fa fa-check" />;
    } else {
      return <i onClick={this.onEditClick} className="fa fa-pencil" />;
    }
  }

  renderContent() {
    if (this.props.note.isEditing) {
      return (
        <div className="content">
          <textarea onChange={this.onInputChange} value={this.props.note.text} />
        </div>
      );
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) }} />;
    }
  }

  render() {
    return (
      <ResizableAndMovable
        onResize={this.onResize}
        onDrag={this.onDrag}
        onClick={this.onClick}
        x={this.props.note.x}
        y={this.props.note.y}
        width={this.props.note.width}
        height={this.props.note.height}
        minWidth={200}
        minHeight={125}
        canUpdatePositionByParent
        zIndex={this.props.note.zIndex}
        dragHandlerClassName=".pin"
      >
        <div className="note">
          <div className="navbar">
            <i className="pin" />
            <div className="bar">
              <span className="title">{this.props.note.title}</span>
              <div className="controls">
                <i onClick={this.onDeleteClick} className="fa fa-trash-o" />
                {this.renderEditButton()}
              </div>
            </div>
          </div>
          {this.renderContent()}
        </div>
      </ResizableAndMovable>
    );
  }
}

export default Note;
