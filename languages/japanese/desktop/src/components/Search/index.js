import React from 'react';

// Components
import Results from './Results';
import Query from './Query';
import Filter from './Filter';

// Styling
import './Search.css';

class Search extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
    this.state = {

      currentLevel: null,

      currentQuery: '',

      currentEntries: [],

      entries: {
        "N1": [
          "N1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

          "N1 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

          "N1 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        ],
        "N2": [
          "N2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

          "N2 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

          "N2 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        ],
        "N3": [
          "N3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

          "N3 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

          "N3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        ],
        "N4": [
          "N4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

          "N4 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

          "N4 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        ],
        "N5": [
          "N5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",

          "N5 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

          "N5 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        ]
      }

    }
  }

  // Private member functions
  handleInput = e => {
    this.setState({currentQuery: e.target.value});
  }

  filteredEntries = () => {
    return this.state.currentEntries.filter((entry) => {
      return entry.includes(this.state.currentQuery);
    });
  }

  showNotification = message => {
    return <p class="notification">{message}</p>
  }

  showResults = () => {
    if (this.state.currentEntries.length === 0) {
      return this.showNotification("There are no entries. Please select a tab above to display entries.")
    } else {
      return <Results filteredEntries={this.filteredEntries} />
    }
  }

  updateLevel = event => {
    this.setState({
      currentLevel: event.target.innerHTML,
      currentEntries: this.state.entries[event.target.innerHTML]
    });
  }

  // Render function
  render() {
    return (
      <div className="Search">

        <Filter updateLevel={this.updateLevel}></Filter>

        <Query handleInput={this.handleInput} />

        {this.showResults()}


      </div>
    );
  }

}


export default Search;
