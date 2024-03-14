import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network';
import { buildMultisigModificationInnerTx } from './buildMultisigModificationInnerTx';
import { buildAccountAddressRestrictionAllowIncomingTxs } from './buildAccountAddressRestrictionInnerTxs';
import { AggregateTransaction, Deadline } from 'symbol-sdk';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { buildTransferInnerTxFromPayerToUser } from './buildTransferInnerTxFromPayerToUser';
import { buildAccountMetadataInnerTxFromDataToUser } from './buildAccountMetadataInnerTxFromDataToUser';
import { User } from '@common/src/models/user/user.model';

export const buildAggregateCompleteTx = async (
  multisigInfo: {
    multisig: Multisig;
    cosigners: Cosigner[];
  },
  user: User,
) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const transferInnerTxFromPayerToUser =
    await buildTransferInnerTxFromPayerToUser(multisigInfo);
  const accountAddressRestrictionAllowIncomingInnerTxs =
    await buildAccountAddressRestrictionAllowIncomingTxs(multisigInfo);
  const accountMetadataInnerTxFromDataToUser =
    await buildAccountMetadataInnerTxFromDataToUser(multisigInfo, user);
  const multisigModificationInnerTx =
    await buildMultisigModificationInnerTx(multisigInfo);

  const aggregateCompleteTx = AggregateTransaction.createComplete(
    Deadline.create(env.symbol.epochAdjustment, 5),
    [
      transferInnerTxFromPayerToUser,
      ...accountAddressRestrictionAllowIncomingInnerTxs,
      accountMetadataInnerTxFromDataToUser,
      multisigModificationInnerTx,
    ],
    networkType,
    [],
  ).setMaxFeeForAggregate(100, 2 + multisigInfo.cosigners.length);
  return aggregateCompleteTx;
};
