import { Account } from '@common/src/models/user/account/account.model';
import { User } from '@common/src/models/user/user.model';

export const onDocumentUpdatedHandler = (
  user: User | undefined,
  beforeAccount: Account,
  afterAccount: Account,
) => {
  console.dir({ user, beforeAccount, afterAccount }, { depth: null });
};
