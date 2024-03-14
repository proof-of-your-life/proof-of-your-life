import { Account as SymbolAccount } from 'symbol-sdk';
import { Account } from './account.model';
import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';

export const generateNewAccount = (): Account => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const account = SymbolAccount.generateNewAccount(networkType);
  return {
    privateKey: account.privateKey,
    publicKey: account.publicKey,
    address: account.address.plain(),
  };
};
