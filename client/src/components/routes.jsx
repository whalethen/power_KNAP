import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from './Homepage/homepage';
import Room from './Room/RoomView';

const router = (
  <BrowserRouter>
    {/* <Route path="/" component={Homepage} /> */}
    <Room />
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById('app'));
