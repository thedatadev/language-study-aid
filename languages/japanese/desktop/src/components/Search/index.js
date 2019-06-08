import React from 'react';

// Components
import Results from './Results';
import Query from './Query';
import Filter from './Filter';

// Styling
import './Search.css';

// Electron
// const electron = window.require('electron');
// const fs  = electron.remote.require('fs');
// const ipcRenderer = electron.ipcRenderer;

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
    this.setState({currentQuery: e.target.value});
  }

  filteredEntries = () => {
    return this.state.currentEntries.filter((entry) => {
      return entry.text.includes(this.state.currentQuery);
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

  loadEntries = (query) => {

    /*

    ---!!! Must use IPC to carry out any file system-related tasks. !!!---
    TODO: Move this to electron.js or in a new file in the same directory.

    */

    // // 1. Read in the jlpt-index.json file
    // const jlptIndexFilepath = path.join(__dirname, "save", "jlpt-index.json");
    // const jlptIndexFile = fs.readFileSync(jlptIndexFilepath);
    // const jlptIndex = JSON.parse(jlptIndexFile.toString());

    // // 2. Merge the postings list for each level
    // let intersection;
    // let postings;

    // query.forEach(term => {
    //   if (term in jlptIndex) {
    //     postings = jlptIndex[term];
    //     intersecton = merge(intersection, postings);
    //   }
    // }); 

    // // 3. Read in all documents corresponding to each doID for each level
    // const corpusFilepath = path.join(__dirname, "corpus.json");
    // const corpusFile = fs.readFileSync(corpusFilepath);
    // const corpus = JSON.parse(corpusFile.toString());

    // // 4. Set the entries[level] to that level's list of documents
    // let entries = {};
    // const levels = ["n1", "n2", "n3", "n4", "n5"];

    // levels.forEach(level => {
    //   let docs = corpus[level];
    //   entries[level] = [];
    //   intersection.forEach(docID => {
    //     if (docID in docs) {
    //       entries[level].push(docs[docID]);
    //     }
    //   });
    // });
    
    // // 5. Call this when the component is mounted
    // this.setState({entries});
  }

  componentDidMount() {
    // this.loadEntries();
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
