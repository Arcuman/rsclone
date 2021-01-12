import { RENDER, TEST_TYPE } from './action.types';

export function testAction() {
  return {
    type: TEST_TYPE,
    payload: 'test',
  };
}
