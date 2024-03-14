import { PublicMultisig } from '@common/src/models';

export const onDocumentDeletedHandler = (deletedMultiig: PublicMultisig) => {
  console.dir({ deletedMultiig }, { depth: null });
};
