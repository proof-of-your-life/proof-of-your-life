import { Account } from '@common/src/models/user/account/account.model';
import { User } from '@common/src/models/user/user.model';

export const onDocumentDeletedHandler = (
  user: User | undefined,
  deletedAccount: Account,
) => {
  console.dir({ user, deletedAccount }, { depth: null });
};
