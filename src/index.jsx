import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer';
import {reset} from './action_creators';
import {AppContainer} from './App';

const store = createStore(reducer);
store.dispatch(reset(20, 20));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('app')
);