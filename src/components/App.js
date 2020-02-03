import '../css/App.css';

import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Charts from './Charts/';
import Commits from './Commits/';

function App() {
  return (
    <div className="App">
      <header>
        <div className='title'>
          <h1>3am* Commits</h1>
          <h3 className='link'><a href='https://github.com/marvinody/3am-commits'>source</a></h3>
        </div>
        <nav>
          <div className='link' ><Link to='/'>Commits</Link></div>
          <div className='link' > <Link to='/charts'>Charts</Link></div>
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
