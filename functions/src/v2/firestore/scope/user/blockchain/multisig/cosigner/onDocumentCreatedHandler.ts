import { PublicCosigner } from '@common/src/models';

export const onDocumentCreatedHandler = async (
  createdCosigner: PublicCosigner,
) => {
  console.dir({ createdCosigner }, { depth: null });
};
