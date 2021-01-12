/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TEST_TYPE } from './action.types';

const initialState = {
  testState: true,
};

export function testReducer(state = initialState, action: { type: any }) {
  switch (action.type) {
    case TEST_TYPE:
      return { ...state, testState: !state.testState };
    default:
      return state;
  }
}
