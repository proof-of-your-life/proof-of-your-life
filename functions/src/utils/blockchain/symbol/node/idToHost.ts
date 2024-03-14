import { utf8HexToString } from '@utils/common/utf8HexToString';

export const idToHost = (id: string): string => {
  return utf8HexToString(id);
};
