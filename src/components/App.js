import React from 'react';
import '../css/App.css';
import Commits from './Commits';
function App() {
  return (
    <div className="App">
      <div className='header'>
        <h1>3am Commits</h1>
        <h3><a href='https://github.com/marvinody/3am-commits'>source</a></h3>
      </div>
      <Commits></Commits>
    </div>
  );
}

export default App;
