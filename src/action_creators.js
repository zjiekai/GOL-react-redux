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
      liveMap: genRandomLiveMap(rowN, colN)
    }
  };
}

export function next() {
  return {
    type: 'NEXT'
  }
}