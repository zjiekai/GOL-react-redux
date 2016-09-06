import React from 'react';
import {connect} from 'react-redux';
import {reset, resetTimestamp, next} from './action_creators';

import './App.css';

const App = React.createClass({
  getInitialState: function() {
    return {value: 5};
  },
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
  nextN: function(n) {
    let ts = new Date().getTime();
    this.props.resetTimestamp(this.props, ts);
    this.props.next(n, ts);
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleNextN: function() {
    this.nextN(this.state.value);
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
      <div className="inputs">
        <button
          ref="reset" className="reset"
          onClick={() => {
            this.props.reset(this.props.rowN, this.props.colN)
          }}
        >reset</button>
        <button
          ref="next" className="next"
          onClick={() => {this.nextN(1)}}
        >next</button>
        <input type="number" min="1" defaultValue="5"
               onChange={this.handleChange} />
        <button
          ref="nextn" className="nextn"
          onClick={this.handleNextN}
        >nextn</button>
      </div>
    </div>
  }
});

function dispatchNext(dispatch, n, ts) {
  for (let i = 0; i < n; ++i) {
    setTimeout(() => {
      dispatch(next(ts));
    }, 100*i);
  }
}

export const AppContainer = connect(
  (state) => (state),
  (dispatch) => ({
    reset: (rowN, colN) => {dispatch(reset(rowN, colN))},
    resetTimestamp: (state, ts) => {dispatch(resetTimestamp(state, ts))},
    next: (n, ts) => {dispatchNext(dispatch, n, ts)}
  })
)(App);