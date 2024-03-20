import {
  AccountRestrictionTransaction,
  Address,
  AddressRestrictionFlag,
  Deadline,
  PublicAccount,
} from 'symbol-sdk';
import { getEnv } from '@utils/firebase/functions';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';

// Note: ユーザーのマルチシグアカウント・連署アカウントが、自身のマルチシグ関連アカウント・手数料立替アカウント・データアカウントからのIncoming Txのみ許可することで、金融的な機能を無効化し、データ保持に特化したアカウントの状態を保つ
export const buildAccountAddressRestrictionAllowIncomingTxs =
  async (multisigInfo: { multisig: Multisig; cosigners: Cosigner[] }) => {
    const env = getEnv();
    const networkType = networkNameToType(env.symbol.network);
    const payerAddress = Address.createFromRawAddress(
      env.symbol.payerAccountAddress,
    );
    const dataAddress = Address.createFromRawAddress(
      env.symbol.dataAccountAddress,
    );
    const targetAddresses = [
      multisigInfo.multisig.address,
      ...multisigInfo.cosigners.map((cosigner) => cosigner.address),
    ];
    const targetPublicKeys = [
      multisigInfo.multisig.publicKey,
      ...multisigInfo.cosigners.map((cosigner) => cosigner.publicKey),
    ];
    const allowAddressList = [
      ...targetAddresses,
      payerAddress.plain(),
      dataAddress.plain(),
    ];

    const accountAddressRestrictionAllowIncomingTxs = targetAddresses.map(
      (address, index) => {
        const targetPublicKey = targetPublicKeys[index];
        const copiedAllowAddressList = [...allowAddressList];
        const allowAdditionAddressList = copiedAllowAddressList
          .filter((allowAddress) => allowAddress !== address)
          .map((address) => Address.createFromRawAddress(address));
        console.dir(
          { index, address, copiedAllowAddressList, allowAdditionAddressList },
          { depth: null },
        );
        return AccountRestrictionTransaction.createAddressRestrictionModificationTransaction(
          Deadline.create(env.symbol.epochAdjustment, 5),
          AddressRestrictionFlag.AllowIncomingAddress,
          allowAdditionAddressList,
          [],
          networkType,
        ).toAggregate(
          PublicAccount.createFromPublicKey(targetPublicKey, networkType),
        );
      },
    );
    return accountAddressRestrictionAllowIncomingTxs;
  };
