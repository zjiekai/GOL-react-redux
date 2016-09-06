const INIT_STATE = {
  rowN: 2,
  colN: 2,
  liveMap: {}
};

export const getNeighbors = function (k, rowN, colN) {
  const x = k % colN;
  const y = Math.floor(k / colN);
  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y], [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1]
  ].filter(
    ([x, y]) => (0 <= x && x < colN && 0 <= y && y < rowN)
  ).map(
    ([x, y]) => (y * colN + x)
  );
};

function next(state) {
  const count = {}, nextLiveMap = {};

  Object.keys(state.liveMap).forEach((k) => {
    const neighbors = getNeighbors(k, state.rowN, state.colN);
    neighbors.forEach((k) => {
      if (count[k]) {
        ++count[k];
      } else {
        count[k] = 1;
      }
    });
  });

  Object.keys(count).forEach((k) => {
    const num = count[k];
    if (state.liveMap[k]) {
      if (num === 2 || num === 3) {
        nextLiveMap[k] = true;
      }
    } else {
      if (num === 3) {
        nextLiveMap[k] = true;
      }
    }
  });

  return {
    rowN: state.rowN,
    colN: state.colN,
    timestamp: state.timestamp,
    liveMap: nextLiveMap
  };
}

export const reducer = function(state, action) {
  if (typeof state === 'undefined') {
    return INIT_STATE;
  }

  switch (action.type) {
    case 'SET_STATE':
      return action.state;
    case 'NEXT':
      return (state.timestamp === action.timestamp) ? next(state) : state;
  }

  return state;
};