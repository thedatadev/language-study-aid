import React from 'react';

// Styling
import './Entry.css';

class Entry extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
  }

  // Private member functions
  // ...
  trimEntryText = text => {
    if (text.length <= 200) {
      return text;
    } else {
      return text.substring(0,100) + "...";
    }
  }

  // Render function
  render() {
    return (
      <div className="entry">
        <div className="entry-title">{this.props.entry.title}</div>
        <div className="entry-text">{this.trimEntryText(this.props.entry.text)}</div>
      </div>
    );
  }
}

export default Entry;
