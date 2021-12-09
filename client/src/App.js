import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import React, { Fragment } from 'react';
import './App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route exact path = '/home' component = {Home}/>
        <Route path = '/home/:id' component = {Detail}/>
        <Route path = '/pokemons' component = {Create}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;