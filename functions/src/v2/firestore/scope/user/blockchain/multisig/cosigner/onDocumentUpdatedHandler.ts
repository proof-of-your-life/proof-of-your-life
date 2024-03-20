import { PublicCosigner } from '@common/src/models';

export const onDocumentUpdatedHandler = (
  beforeCosigner: PublicCosigner,
  afterCosigner: PublicCosigner,
) => {
  console.dir({ beforeCosigner, afterCosigner }, { depth: null });
};
