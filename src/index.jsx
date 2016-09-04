import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer';
import {reset} from './action_creators';
import {AppContainer} from './App';

const store = createStore(reducer);
store.dispatch(reset(3, 3));
const state0 = {
  rowN: 3,
  colN: 3,
  liveMap: {}
};
//store.dispatch({type: 'SET_STATE', state: state0});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('app')
);