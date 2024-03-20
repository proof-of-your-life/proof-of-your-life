import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { getEnv } from '@utils/firebase/functions';
import {
  AccountMetadataTransaction,
  Deadline,
  KeyGenerator,
  Convert,
  PublicAccount as SymbolPublicAccount,
} from 'symbol-sdk';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import { PublicAccount } from '@common/src/models';

// Note: accountデータを、sourceAddress=データアカウント、targetAddress=ユーザーのマルチシグアカウントに、MetadataKey="poyl.user.account"でJSON.stringifyしたデータで新規登録する
export const buildAccountMetadataInnerTxFromDataToUserAccount = async (
  multisigInfo: {
    multisig: Multisig;
    cosigners: Cosigner[];
  },
  publicAccount: PublicAccount,
) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const multisigPublicAccount = SymbolPublicAccount.createFromPublicKey(
    multisigInfo.multisig.publicKey,
    networkType,
  );
  const dataPublicAccount = SymbolPublicAccount.createFromPublicKey(
    env.symbol.dataAccountPublicKey,
    networkType,
  );
  const userAccountMetadataKey =
    KeyGenerator.generateUInt64Key('user.account.0');
  const userAccountMetadataValue = JSON.stringify({
    account: publicAccount,
  });
  const userMetadataValueByte = Convert.utf8ToUint8(userAccountMetadataValue);
  const userMetadataValueSize = userMetadataValueByte.length;
  const accountMetadataTxFromDataToUserAccount =
    AccountMetadataTransaction.create(
      Deadline.create(env.symbol.epochAdjustment, 5),
      multisigPublicAccount.address,
      userAccountMetadataKey,
      userMetadataValueSize,
      userMetadataValueByte,
      networkType,
    ).toAggregate(dataPublicAccount);
  return accountMetadataTxFromDataToUserAccount;
};
