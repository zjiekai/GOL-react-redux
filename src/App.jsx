import React from 'react';
import {connect} from 'react-redux';
import {reset, next} from './action_creators';

import './App.css';

const App = React.createClass({
  getGrids: function() {
    const {rowN, colN, liveMap} = this.props;
    return Array.from(Array(rowN).keys())
      .map(
        i => {
          return [i, Array.from(Array(colN).keys())
            .map(j => {
              const k = i*colN + j;
              return [k, (liveMap[k] ? 'live': 'dead')];
            })];
        }
      );
  },
  render: function() {
    return <div className="gol">
      <div className="grid-container">
        {this.getGrids().map(([rowKey, row]) =>
          <div key={rowKey} className="row">
            {row.map(([key, state]) =>
              <div key={key} className={state}></div>
            )}
          </div>
        )}
      </div>
      <div className="buttons">
        <button
          ref="reset" className="reset"
          onClick={() => {
            this.props.reset(this.props.rowN, this.props.colN)
          }}
        >reset</button>
        <button
          ref="next" className="next"
          onClick={() => {
            this.props.next()
          }}
        >next</button>
      </div>
    </div>
  }
});

export const AppContainer = connect(
  (state) => (state),
  (dispatch) => ({
    reset: (rowN, colN) => {dispatch(reset(rowN, colN))},
    next: () => {dispatch(next())}
  })
)(App);