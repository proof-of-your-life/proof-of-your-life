import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network';
import { AggregateTransaction, Deadline } from 'symbol-sdk';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { buildTransferInnerTxFromPayerToUser } from './buildTransferInnerTxFromPayerToUser';
import { buildAccountMetadataInnerTxFromDataToUserAccount } from './buildAccountMetadataInnerTxFromDataToUserAccount';
import { PublicAccount } from '@common/src/models';

export const buildAggregateCompleteTx = async (
  multisigInfo: {
    multisig: Multisig;
    cosigners: Cosigner[];
  },
  publicAccount: PublicAccount,
) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const transferInnerTxFromPayerToUser =
    await buildTransferInnerTxFromPayerToUser(multisigInfo);
  const accountMetadataInnerTxFromDataToUser =
    await buildAccountMetadataInnerTxFromDataToUserAccount(
      multisigInfo,
      publicAccount,
    );

  const aggregateCompleteTx = AggregateTransaction.createComplete(
    Deadline.create(env.symbol.epochAdjustment, 5),
    [transferInnerTxFromPayerToUser, accountMetadataInnerTxFromDataToUser],
    networkType,
    [],
  ).setMaxFeeForAggregate(100, 1);
  return aggregateCompleteTx;
};
