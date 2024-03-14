import { stringToUtf8Hex } from '@utils/common/stringToUtf8Hex';

export const hostToId = (host: string): string => {
  return stringToUtf8Hex(host);
};
