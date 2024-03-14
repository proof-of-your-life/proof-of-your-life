import {
  Address,
  Deadline,
  MultisigAccountModificationTransaction,
  PublicAccount,
} from 'symbol-sdk';
import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';

// Note: ユーザーのSymbolアカウントを(将来的にマルチシグの連署アカウントをユーザー自身の管理アカウントに入れ替える等の形でスムーズに非中央集権化できるような形で)マルチシグ化しておく。
export const buildMultisigModificationInnerTx = async (multisigInfo: {
  multisig: Multisig;
  cosigners: Cosigner[];
}) => {
  const env = getEnv();
  console.dir({ env }, { depth: null });
  const networkType = networkNameToType(env.symbol.network);
  console.dir({ networkType }, { depth: null });
  const multisigModificationInnerTx =
    MultisigAccountModificationTransaction.create(
      Deadline.create(env.symbol.epochAdjustment, 5),
      multisigInfo.multisig.minApproval,
      multisigInfo.multisig.minRemoval,
      multisigInfo.cosigners.map((cosigner) =>
        Address.createFromRawAddress(cosigner.address),
      ),
      [],
      networkType,
    ).toAggregate(
      PublicAccount.createFromPublicKey(
        multisigInfo.multisig.publicKey,
        networkType,
      ),
    );
  return multisigModificationInnerTx;
};
