import { PublicCosigner } from '@common/src/models';

export const onDocumentDeletedHandler = (deletedCosigner: PublicCosigner) => {
  console.dir({ deletedCosigner }, { depth: null });
};
