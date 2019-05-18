import React from 'react';
import { Link } from "react-router-dom";

import './Landing.scss';

class Landing extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div id="landing">
        <h1>Language Resource Recommender</h1>
        <p>Search for articles, videos, and other authentic learning material in your target language</p>
        <button type="button">
          <Link to="/search">Search</Link>
        </button>
      </div>
    );
  }
}



export default Landing;
