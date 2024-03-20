import { createRandomHexString } from './createRandomHexString';

export const createIvHexString = (): string => {
  return createRandomHexString(16);
};
