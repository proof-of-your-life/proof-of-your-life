import { User, Multisig } from '@common/src/models';

export const onDocumentUpdatedHandler = (
  user: User | undefined,
  beforeMultisig: Multisig,
  afterMultisig: Multisig,
) => {
  console.dir({ user, beforeMultisig, afterMultisig }, { depth: null });
};
