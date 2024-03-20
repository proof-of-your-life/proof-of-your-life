import { buildAggregateCompleteTx } from './buildAggregateCompleteTx';
import { decryptEncryptedAccount } from '@utils/blockchain/symbol/account/decryptEncryptedAccount';
import { Account } from 'symbol-sdk';
import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import { announceWithRandomNodes } from '@utils/blockchain/symbol/tx/announceWithRandomNodes';
import { PublicAccount, User } from '@common/src/models';
import { getMultisigInfoFromUserId } from '@utils/blockchain/symbol/account/getAccountsInfoFromUserId';

export const sendCreateUserAccountTx = async (
  user: User,
  publicAccount: PublicAccount,
  payerPrivateKey: string,
  password: string,
) => {
  console.log({ payerPrivateKey });
  console.log({ password });

  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);

  const multisigInfo = await getMultisigInfoFromUserId(user.id);
  console.log({ multisigInfo });

  const tx = await buildAggregateCompleteTx(multisigInfo, publicAccount);

  const payerAccount = Account.createFromPrivateKey(
    payerPrivateKey,
    networkType,
  );
  const cosignersAccounts = multisigInfo.cosigners.map((cosigner) => {
    return Account.createFromPrivateKey(
      decryptEncryptedAccount(
        {
          encryptedPrivateKey: cosigner.encryptedPrivateKey,
          ivHexString: cosigner.ivHexString,
          saltHexString: cosigner.saltHexString,
          publicKey: cosigner.publicKey,
          address: cosigner.address,
        },
        password,
      ).privateKey,
      networkType,
    );
  });

  const signedTx = payerAccount.signTransactionWithCosignatories(
    tx,
    [cosignersAccounts[0]],
    env.symbol.generationHash,
  );

  const txResults = await announceWithRandomNodes(
    signedTx,
    user,
    `users/${user.id}/accounts/${publicAccount.id}`,
    'Account',
    publicAccount,
    'CREATE',
  );

  console.log({ txResults });
};
