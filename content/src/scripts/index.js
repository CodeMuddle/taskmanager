import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/app/App';

const proxyStore = new Store({portName: 'example'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
  <Provider store={proxyStore}>
    <div></div>
  </Provider>
  , document.getElementById('rcr-anchor'));
