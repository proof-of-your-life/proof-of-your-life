import * as crypto from 'crypto';

export const createRandomHexString = (byteLength: number): string => {
  return crypto.randomBytes(byteLength).toString('hex');
};
