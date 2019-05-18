import React from 'react';

import Results from './Results';

import './Search.scss';

class Search extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div id="search">
      <div className="header">
        <div id="form">

          <div id="query">
            <input type="text" placeholder="Enter search query"/>
          </div>

          <div id="terms">
            <span>Lorem</span>
            <span>ipsum</span>
            <span>dolor</span>
            <span>sit</span>
            <span>amet</span>
            <span>consectetur</span>
            <span>adipiscing</span>
            <span>elit</span>
          </div>

        </div>
      </div>
      <div className="content">
        <Results />
      </div>
      </div>
    );
  }
}



export default Search;
