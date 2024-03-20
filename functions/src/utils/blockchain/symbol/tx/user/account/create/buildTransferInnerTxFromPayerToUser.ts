import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { getEnv } from '@utils/firebase/functions';
import {
  Address,
  Deadline,
  EmptyMessage,
  PublicAccount,
  TransferTransaction,
} from 'symbol-sdk';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';

// Note: 手数料立替アカウントからの空の転送txで手数料立替のためのダミーtx。このtxをアグリゲートtxに含めて、アグリゲートtxのSignerを手数料立替アカウントにすれば手数料立替が可能。
export const buildTransferInnerTxFromPayerToUser = async (multisigInfo: {
  multisig: Multisig;
  cosigners: Cosigner[];
}) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const payerPublicAccount = PublicAccount.createFromPublicKey(
    env.symbol.payerAccountPublicKey,
    networkType,
  );
  const transferInnerTxFromPayerToUser = TransferTransaction.create(
    Deadline.create(env.symbol.epochAdjustment, 5),
    Address.createFromRawAddress(multisigInfo.multisig.address),
    [],
    EmptyMessage,
    networkType,
  ).toAggregate(payerPublicAccount);
  return transferInnerTxFromPayerToUser;
};
