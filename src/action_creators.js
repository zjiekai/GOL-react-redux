export function reset(rowN, colN) {
  return {
    type: 'SET_STATE',
    state: {
      rowN: rowN,
      colN: colN,
      liveMap: {}
    }
  };
}

export function next() {
  return {
    type: 'NEXT'
  }
}