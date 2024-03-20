import * as crypto from 'crypto';
import { convertHexStringToBuffer } from './convertHexStringToBuffer';

export const decrypt = (
  encryptedMessage: string,
  password: string,
  saltHexString: string,
  ivHexString: string,
): string => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(password, saltHexString, 32);
  const iv = convertHexStringToBuffer(ivHexString);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decipherData = decipher.update(encryptedMessage, 'hex', 'utf-8');
  decipherData += decipher.final('utf-8');
  return decipherData;
};
