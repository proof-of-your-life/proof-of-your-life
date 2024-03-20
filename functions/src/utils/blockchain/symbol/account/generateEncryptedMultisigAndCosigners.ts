import { generateNewEncryptedAccount } from '../account';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { User } from '@common/src/models';

export const generateEncryptedMultisigAndCosigners = (
  password: string,
  user: User,
) => {
  const multisigEncryptedAccount = generateNewEncryptedAccount(password);
  const cosignersEncryptedAccounts = [];
  for (let index = 0; index < 3; index++) {
    cosignersEncryptedAccounts.push(generateNewEncryptedAccount(password));
  }

  const now = new Date();
  const multisig: Multisig = {
    id: multisigEncryptedAccount.address,
    type: 'multisig',
    ...multisigEncryptedAccount,
    minApproval: 1,
    minRemoval: 2,
    userId: user.id,
    blockchainId: 'symbol',
    createdAt: now,
    updatedAt: now,
  };
  const cosigners = cosignersEncryptedAccounts.map(
    (cosignerEncryptedAccount) => {
      const cosigner: Cosigner = {
        id: cosignerEncryptedAccount.address,
        type: 'cosigner',
        ...cosignerEncryptedAccount,
        userId: user.id,
        blockchainId: 'symbol',
        createdAt: now,
        updatedAt: now,
      };
      return cosigner;
    },
  );
  return {
    multisig,
    cosigners,
  };
};
