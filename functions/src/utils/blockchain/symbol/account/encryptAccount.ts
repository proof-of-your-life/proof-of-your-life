import { createIvHexString, createSaltHexString, encrypt } from '@utils/cipher';
import { Account } from './account.model';

export const encryptAccount = (account: Account, password: string) => {
  const saltHexString = createSaltHexString();
  const ivHexString = createIvHexString();
  const encryptedPrivateKey = encrypt(
    account.privateKey,
    password,
    saltHexString,
    ivHexString,
  );
  return {
    saltHexString,
    ivHexString,
    encryptedPrivateKey,
    publicKey: account.publicKey,
    address: account.address,
  };
};
