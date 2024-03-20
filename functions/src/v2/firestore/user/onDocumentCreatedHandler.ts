import { sendCreateUserTx } from '@utils/blockchain';
import { User } from './user.model';
import { Account, PublicUser, convertToPublicUser } from '@common/src/models';
import { autoId, converter, firestore } from '@utils/firebase';

export const onDocumentCreatedHandler = async (
  createdUser: User,
  payerPrivateKey: string,
  dataPrivateKey: string,
) => {
  console.dir({ createdUser }, { depth: null });

  // Note: 公開用データを作成
  const publicUser: PublicUser = convertToPublicUser(createdUser);
  await firestore.doc(`scopes/public/users/${createdUser.id}`).set(publicUser);

  // Note: ユーザーのSymbolブロックチェーン上のデータを扱うマルチシグアカウント・連署アカウント・アドレス制限・メタデータ設定を実行し、成功したらfirestoreにマルチシグ、連署アカウントの情報を保存
  await sendCreateUserTx(createdUser, payerPrivateKey, dataPrivateKey);

  // Note: ログインに使用された連携アカウントの情報を保存
  const account: Account = {
    id: autoId(),
    providerId: createdUser.providerId,
    displayName: createdUser.displayName,
    photoUrl: createdUser.photoUrl,
    email: createdUser.email,
    phoneNumber: createdUser.phoneNumber,

    index: 0,
    userId: createdUser.id,

    approved: false,
    default: true,
    privacy: 'PRIVATE',

    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  };
  await firestore
    .doc(`users/${createdUser.id}/accounts/${account.id}`)
    .withConverter(converter<Account>())
    .set(account);
};
