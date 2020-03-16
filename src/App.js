import React from 'react';
import Dashboard from "./client/dashboard.component"
import Store from "./client/store.component"

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
