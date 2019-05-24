import React from 'react';

import './Filter.css';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      levels: ["N1", "N2", "N3", "N4", "N5"],
      currentLevel: null
    }
  }

  updateLevel = event => {
    this.setState({currentLevel: event.target.innerHTML});
  }

  filterTab = (tab) => {
    return <div className="filter-tab"
                key={tab}
                onClick={this.updateLevel}>{tab}</div>
  }

  render() {

    return (

      <div className="filter">

        <div className="filter-class">
          <p>JLPT</p>
        </div>

        <div className="filter-tabs">
          {this.state.levels.map(level => {
            return this.filterTab(level);
          })}
        </div>

      </div>

    );

  }

 }


export default Filter;
