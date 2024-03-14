import { User, Multisig, Cosigner } from '@common/src/models';

export const onDocumentDeletedHandler = (
  user: User,
  multisig: Multisig,
  deletedCosigner: Cosigner,
) => {
  console.dir({ user, multisig, deletedCosigner }, { depth: null });
};
