import { PublicMultisig } from '@common/src/models';

export const onDocumentCreatedHandler = async (
  createdMultisig: PublicMultisig,
) => {
  console.dir({ createdMultisig }, { depth: null });
};
