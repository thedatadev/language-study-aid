import React from 'react';

// Components
import Entry from './Entry';

// Styling
import './Results.css';

class Results extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
  }

  // Private member functions
  showEntry = entry => {
    return <Entry entry={entry} />
  }

  // Render function
  render() {
    return (
      <div className="results">
        {this.props.filteredEntries().map(this.showEntry)}
      </div>
    );
  }
}

export default Results;
