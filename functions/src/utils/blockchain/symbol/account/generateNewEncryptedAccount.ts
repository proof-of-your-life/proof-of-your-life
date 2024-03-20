import { generateNewAccount } from './generateNewAccount';
import { encryptAccount } from './encryptAccount';

export const generateNewEncryptedAccount = (password: string) => {
  const account = generateNewAccount();
  const encryptedAccount = encryptAccount(account, password);
  return encryptedAccount;
};
