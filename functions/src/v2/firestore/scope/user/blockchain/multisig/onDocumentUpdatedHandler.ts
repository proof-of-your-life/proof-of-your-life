import { PublicMultisig } from '@common/src/models';

export const onDocumentUpdatedHandler = (
  beforeMultisig: PublicMultisig,
  afterMultisig: PublicMultisig,
) => {
  console.dir({ beforeMultisig, afterMultisig }, { depth: null });
};
