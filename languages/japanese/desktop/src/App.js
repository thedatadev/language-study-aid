import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './components/Landing';
import Search from './components/Search';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/search" component={Search}/>
      </Router>
    </div>
  );
}

export default App;
