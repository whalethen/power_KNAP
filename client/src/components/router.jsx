import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, IndexRoute } from 'react-router-dom';
import Home from './Homepage/homepage';
import Room from './Room/RoomView';

const router = (
  <Router>
    <Switch>
      <Route path="/room" component={Room} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

ReactDOM.render(router, document.getElementById('homepage'));
