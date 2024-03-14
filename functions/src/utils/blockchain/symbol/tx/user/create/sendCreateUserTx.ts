import { User } from '@common/src/models/user/user.model';
import { buildAggregateCompleteTx } from './buildAggregateCompleteTx';
import { decryptEncryptedAccount } from '@utils/blockchain/symbol/account/decryptEncryptedAccount';
import { Account } from 'symbol-sdk';
import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import { announceWithRandomNodes } from '@utils/blockchain/symbol/tx/announceWithRandomNodes';
import { generateEncryptedMultisigAndCosigners } from '@utils/blockchain/symbol/account/generateEncryptedMultisigAndCosigners';
import { firestore } from '@utils/firebase/admin';
import { converter } from '@utils/firebase';
import { Cosigner, Multisig } from '@common/src/models';

export const sendCreateUserTx = async (
  user: User,
  payerPrivateKey: string,
  password: string,
) => {
  console.log({ payerPrivateKey });
  console.log({ password });

  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);

  const multisigInfo = generateEncryptedMultisigAndCosigners(password, user);
  console.log({ multisigInfo });

  const tx = await buildAggregateCompleteTx(multisigInfo, user);

  const payerAccount = Account.createFromPrivateKey(
    payerPrivateKey,
    networkType,
  );
  console.log({ payerAccountAddress: payerAccount.address.plain() });
  const dataAccount = Account.createFromPrivateKey(password, networkType);
  console.log({ dataAccountAddress: dataAccount.address.plain() });
  const multisigAccount = Account.createFromPrivateKey(
    decryptEncryptedAccount(
      {
        encryptedPrivateKey: multisigInfo.multisig.encryptedPrivateKey,
        ivHexString: multisigInfo.multisig.ivHexString,
        saltHexString: multisigInfo.multisig.saltHexString,
        publicKey: multisigInfo.multisig.publicKey,
        address: multisigInfo.multisig.address,
      },
      password,
    ).privateKey,
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
    [
      // dataAccount,
      multisigAccount,
      ...cosignersAccounts,
    ],
    env.symbol.generationHash,
  );

  const txResults = await announceWithRandomNodes(
    signedTx,
    user,
    `users/${user.id}`,
    'User',
    user,
    'CREATE',
  );

  console.log({ txResults });

  if (txResults instanceof Error) {
    console.warn(txResults);
    return undefined;
  } else {
    console.log('txSuccess');
    await Promise.all([
      firestore
        .doc(
          `users/${user.id}/blockchains/symbol/multisigs/${multisigInfo.multisig.address}`,
        )
        .withConverter(converter<Multisig>())
        .set(multisigInfo.multisig),
      ...multisigInfo.cosigners.map((cosigner) =>
        firestore
          .doc(
            `users/${user.id}/blockchains/symbol/multisigs/${multisigInfo.multisig.address}/cosigners/${cosigner.address}`,
          )
          .withConverter(converter<Cosigner>())
          .set(cosigner),
      ),
    ]);
    return signedTx.hash;
  }
};
