import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from './Homepage/homepage';
import Room from './Room/RoomView';

const router = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/:roomId" component={Room} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById('app'));
