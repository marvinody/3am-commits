import React from 'react';
import '../css/App.css';
import Commits from './Commits';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Charts from './Charts';
function App() {
  return (
    <div className="App">
      <header>
        <div className='title'>
          <h1>3am Commits</h1>
          <h3><a href='https://github.com/marvinody/3am-commits'>source</a></h3>
        </div>
        <nav>
          <div><Link to='/'>Commits</Link></div>
          <div><Link to='/charts'>Charts</Link></div>
        </nav>
      </header>
      <div class='container'>

        <Switch>
          <Route path='/charts'>
            <Charts></Charts>
          </Route>
          <Route>
            <Commits></Commits>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
