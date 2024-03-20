import { User, Multisig } from '@common/src/models';

export const onDocumentDeletedHandler = (
  user: User | undefined,
  deletedMultisig: Multisig,
) => {
  console.dir({ user, deletedMultisig }, { depth: null });
};
