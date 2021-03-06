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
          { title: "Placeholder title",
            text: "N1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},

          { title: "Placeholder title",
            text: "N1 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

          { title: "Placeholder title",
            text: "N1 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "},
        ],
        "N2": [
          { title: "Placeholder title",
            text: "N2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},

          { title: "Placeholder title",
            text: "N2 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

          { title: "Placeholder title",
            text: "N2 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "},
        ],
        "N3": [
          { title: "Placeholder title",
            text: "N3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},

          { title: "Placeholder title",
            text: "N3 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

          { title: "Placeholder title",
            text: "N3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "},
        ],
        "N4": [
          { title: "Placeholder title",
            text: "N4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},

          { title: "Placeholder title",
            text: "N4 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

          { title: "Placeholder title",
            text: "N4 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "},
        ],
        "N5": [
          { title: "Placeholder title",
            text: "N5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},

          { title: "Placeholder title",
            text: "N5 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

          { title: "Placeholder title",
            text: "N5 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "},
        ]
      }

    }
  }

  // Private member functions
  handleInput = e => {
    // this.setState({currentQuery: e.target.value});
    if (e.key == "Enter") {
      this.loadEntries();
    } 
  }

  // filteredEntries = () => {
  //   return this.state.currentEntries.filter((entry) => {
  //     return entry.text.includes(this.state.currentQuery);
  //   });
  // }

  showNotification = message => {
    return <p className="notification">{message}</p>
  }

  showResults = () => {
    if (this.state.currentEntries.length === 0) {
      return this.showNotification("There are no entries. Please select a tab above to display entries.")
    } else {
      // return <Results filteredEntries={this.filteredEntries} />
      return <Results filteredEntries={this.state.currentEntries} />
    }
  }

  updateLevel = event => {
    this.setState({
      currentLevel: event.target.innerHTML,
      currentEntries: this.state.entries[event.target.innerHTML]
    });
  }

  loadEntries = () => {

    // Break up query by space
    // TODO

    let query = [ "世界", "日本" ];

    const api_endpoint = "http://127.0.0.1:3300/api";

    let request = new Request(api_endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "query": query
      })
    });
    
    fetch(request)
      .then(response => response.json())
      .then(payload => {
        this.setState({currentEntries: payload.entries});
      })

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
