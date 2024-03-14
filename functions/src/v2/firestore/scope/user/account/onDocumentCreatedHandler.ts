import { Account } from '@common/src/models/user/account/account.model';
import { User } from '@common/src/models/user/user.model';
import { sendCreateUserAccountTx } from '@utils/blockchain/symbol/tx/user/account/create';

export const onDocumentCreatedHandler = async (
  user: User,
  createdAccount: Account,
  payerPrivateKey: string,
  dataPrivateKey: string,
) => {
  console.dir({ user, createdAccount }, { depth: null });

  await sendCreateUserAccountTx(
    user,
    createdAccount,
    payerPrivateKey,
    dataPrivateKey,
  );
};
