import { createRandomHexString } from './createRandomHexString';

export const createSaltHexString = (): string => {
  return createRandomHexString(16);
};
