import React from 'react';


import Dashboard from "./dashboard.component"
import Store from "./store.component"

import './App.css';

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
        
    </div>
  );
}

export default App;
