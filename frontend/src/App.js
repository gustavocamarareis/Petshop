import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Calendario from './components/Calendario/Calendario'

import './App.css';

  function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/calendario" component={ Calendario } />
      </Switch>
    </BrowserRouter> 
  );
}

export default App;

