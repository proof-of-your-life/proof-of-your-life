import * as crypto from 'crypto';
import { convertHexStringToBuffer } from './convertHexStringToBuffer';

export const encrypt = (
  plainMessage: string,
  password: string,
  saltHexString: string,
  ivHexString: string,
): string => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(password, saltHexString, 32);
  const iv = convertHexStringToBuffer(ivHexString);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let cipherData = cipher.update(plainMessage, 'utf8', 'hex');
  cipherData += cipher.final('hex');
  return cipherData;
};
