import React from 'react';
import './App.css';
import ReactLoader from './components/shared/loader'
function App() {
    document.title = 'ATS';
  return (
    <div className="App">
    <ReactLoader loading="false"/>
    </div> 
  );
}

export default App;
