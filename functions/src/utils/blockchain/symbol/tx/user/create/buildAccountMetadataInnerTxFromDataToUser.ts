import { Cosigner } from '@common/src/models/user/blockchain/multisig/cosigner/cosigner.model';
import { Multisig } from '@common/src/models/user/blockchain/multisig/multisig.model';
import { getEnv } from '@utils/firebase/functions';
import {
  AccountMetadataTransaction,
  Deadline,
  KeyGenerator,
  PublicAccount,
  Convert,
} from 'symbol-sdk';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';
import {
  PublicUser,
  User,
  convertToPublicUser,
} from '@common/src/models/user/user.model';

// Note: userデータを、sourceAddress=データアカウント、targetAddress=ユーザーのマルチシグアカウントに、MetadataKey="poyl.user"でJSON.stringifyしたデータで新規登録する
// Note: なお、userデータは、初回登録時に自動登録されるとともに、表面的な活用は行われないデータなので、id以外のデータはブロックチェーンに記録しない
export const buildAccountMetadataInnerTxFromDataToUser = async (
  multisigInfo: {
    multisig: Multisig;
    cosigners: Cosigner[];
  },
  user: User,
) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const multisigPublicAccount = PublicAccount.createFromPublicKey(
    multisigInfo.multisig.publicKey,
    networkType,
  );
  const dataPublicAccount = PublicAccount.createFromPublicKey(
    env.symbol.dataAccountPublicKey,
    networkType,
  );
  const publicUser: PublicUser = convertToPublicUser(user);
  const userMetadataKey = KeyGenerator.generateUInt64Key('user');
  const userMetadataValue = JSON.stringify({
    user: publicUser,
  });
  const userMetadataValueByte = Convert.utf8ToUint8(userMetadataValue);
  const userMetadataValueSize = userMetadataValueByte.length;
  const accountMetadataTxFromDataToUsers = AccountMetadataTransaction.create(
    Deadline.create(env.symbol.epochAdjustment, 5),
    multisigPublicAccount.address,
    userMetadataKey,
    userMetadataValueSize,
    userMetadataValueByte,
    networkType,
  ).toAggregate(dataPublicAccount);
  return accountMetadataTxFromDataToUsers;
};
