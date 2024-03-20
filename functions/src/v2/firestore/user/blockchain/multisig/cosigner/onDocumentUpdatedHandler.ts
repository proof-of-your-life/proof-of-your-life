import { User, Multisig, Cosigner } from '@common/src/models';

export const onDocumentUpdatedHandler = (
  user: User,
  multisig: Multisig,
  beforeCosigner: Cosigner,
  afterCosigner: Cosigner,
) => {
  console.dir(
    { user, multisig, beforeCosigner, afterCosigner },
    { depth: null },
  );
};
