import React from 'react';

// Styling
import './Query.css';

class Query extends React.Component {
  // Local state; private member variables
  constructor() {
    super();
  }

  // Private member functions
  // ...

  // Render function
  render() {
    return (
      <div className="query">
        <input id="query"
               type="text"
               placeholder="Filter out text..."
               onChange={this.props.handleInput}/>
      </div>
    );
  }
}

export default Query;
