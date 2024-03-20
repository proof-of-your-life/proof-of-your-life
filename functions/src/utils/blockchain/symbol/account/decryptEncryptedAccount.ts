import { decrypt } from '@utils/cipher';
import { EncryptedAccount, Account } from './account.model';

export const decryptEncryptedAccount = (
  encryptedAccount: EncryptedAccount,
  password: string,
): Account => {
  const privateKey = decrypt(
    encryptedAccount.encryptedPrivateKey,
    password,
    encryptedAccount.saltHexString,
    encryptedAccount.ivHexString,
  );
  const account: Account = {
    privateKey,
    publicKey: encryptedAccount.publicKey,
    address: encryptedAccount.address,
  };
  return account;
};
