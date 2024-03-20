import {
  Account,
  PublicAccount,
  convertToPublicAccount,
} from '@common/src/models/user/account/account.model';
import { User } from '@common/src/models/user/user.model';
import { firestore } from '@utils/firebase';

export const onDocumentCreatedHandler = async (
  user: User,
  createdAccount: Account,
) => {
  console.dir({ user, createdAccount }, { depth: null });

  const publicAccount: PublicAccount = convertToPublicAccount(createdAccount);
  await firestore
    .doc(`scopes/public/users/${user.id}/accounts/${createdAccount.id}`)
    .set(publicAccount);
};
