import React from 'react';

// Components
import Entry from './Entry';

// Styling
import './Results.css';
import { throwStatement } from '@babel/types';

class Results extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
  }

  // Private member functions
  showEntry = entry => {
    return <Entry entry={entry} />
  }

  filteredEntries = entries => {
    let filteredEntries = [];
    entries.forEach(entry => {
      if (entry !== undefined) {

        if ("text" in entry && "title" in entry) {

          if (entry.text.length > 0 && entry.title.length > 0) {

            filteredEntries.push(entry);

          }

        }

      }
    });
    return filteredEntries;
  }

  // Render function
  render() {
    return (
      <div className="results">
        {/* {this.props.filteredEntries().map(this.showEntry)} */}
        {/* {this.props.filteredEntries.map(this.showEntry)} */}
        {/* {this.showResults(this.props.filteredEntries)} */}

        {this.filteredEntries(this.props.filteredEntries).map(this.showEntry)}

      </div>
    );
  }
}

export default Results;
