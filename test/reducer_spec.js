import {expect} from 'chai';
import {reducer, getNeighbors} from '../src/reducer';

describe('reducer', () => {

  it('SET_STATE', () => {
    const state0 = {};
    const state1 = {
      rowN: 2,
      colN: 3,
      liveMap: {}
    };
    const action = {
      type: 'SET_STATE',
      state: state1
    };
    const nextState = reducer(state0, action);

    expect(nextState).to.eql(state1);
  });

  describe('NEXT', () => {

    describe('getNeighbors', () => {
      it('00 => 01, 10, 11', () => {
        const ns = getNeighbors(0, 2, 2);
        expect(ns).to.include.members([1, 2, 3]);
      });
      it('11 => 00, 01, 02, 10, 12', () => {
        const ns = getNeighbors(4, 2, 3);
        expect(ns).to.include.members([0, 1, 2, 3, 5]);
      });
    });

    it('[] => []', () => {
      const state = {
        rowN: 2, colN: 2,
        liveMap: {}
      };
      const action = {
        type: 'NEXT',
        state
      };
      const nextState = reducer(state, action);
      expect(nextState).to.eql(state);
    });

    it('[00] => []', () => {
      const state = {
        rowN: 2, colN: 2,
        liveMap: {0: true}
      };
      const action = {
        type: 'NEXT',
        state
      };
      const nextState = reducer(state, action);
      expect(nextState).to.eql({
        rowN: 2, colN: 2,
        liveMap: {}
      });
    });

    it('[00, 11] => []', () => {
      const state = {
        rowN: 2, colN: 2,
        liveMap: {0: true, 3: true}
      };
      const action = {
        type: 'NEXT',
        state
      };
      const nextState = reducer(state, action);
      expect(nextState).to.eql({
        rowN: 2, colN: 2,
        liveMap: {}
      });
    });

    it('[00, 01, 11] => [00, 01, 10, 11]', () => {
      const state = {
        rowN: 2, colN: 2,
        liveMap: {0: true, 1: true, 3: true}
      };
      const action = {
        type: 'NEXT',
        state
      };
      const nextState = reducer(state, action);
      expect(nextState).to.eql({
        rowN: 2, colN: 2,
        liveMap: {0: true, 1: true, 2: true, 3:true}
      });
    });
  });
});