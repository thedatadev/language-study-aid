import React from 'react';

// Components
import Results from './Results';
import Query from './Query';

// Styling
import './Search.css';

class Search extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
    this.state = {

      currentQuery: '',

      entries: [

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",

        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",

        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",

        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      ]

    }
  }

  // Private member functions
  handleInput = e => {
    this.setState({currentQuery: e.target.value});
  }

  filteredEntries = () => {
    return this.state.entries.filter((entry) => {
      return entry.includes(this.state.currentQuery);
    });
  }

  // Render function
  render() {
    return (
      <div className="Search">

        <Query handleInput={this.handleInput} />

        <Results filteredEntries={this.filteredEntries} />

      </div>
    );
  }

}


export default Search;
