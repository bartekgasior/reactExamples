import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Component1 from './Components/Component1.js';
import Component2 from './Components/Component2.js';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Component2} />

      </div>
    </Router>
  );
}

export default App;
