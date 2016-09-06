function genRandomLiveMap(rowN, colN) {
  const N = rowN * colN;
  const liveMap = {};
  for (let i = 0; i < N; ++i) {
    if (Math.random() > 0.8) {
      liveMap[i] = true;
    }
  }
  return liveMap;
}

export function reset(rowN, colN) {
  return {
    type: 'SET_STATE',
    state: {
      rowN: rowN,
      colN: colN,
      timestamp: new Date().getTime(),
      liveMap: genRandomLiveMap(rowN, colN)
    }
  };
}

export function resetTimestamp(state, ts) {
  return {
    type: 'SET_STATE',
    state: {
      rowN: state.rowN,
      colN: state.colN,
      timestamp: ts,
      liveMap: state.liveMap
    }
  }
}

export function next(ts) {
  return {
    type: 'NEXT',
    timestamp: ts
  }
}