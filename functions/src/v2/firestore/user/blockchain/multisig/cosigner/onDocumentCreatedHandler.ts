import { firestore } from '@utils/firebase';
import {
  User,
  Multisig,
  Cosigner,
  PublicCosigner,
  convertToPublicCosigner,
} from '@common/src/models';

export const onDocumentCreatedHandler = async (
  user: User,
  multisig: Multisig,
  createdCosigner: Cosigner,
) => {
  console.dir({ user, multisig, createdCosigner }, { depth: null });

  const publicCosigner: PublicCosigner =
    convertToPublicCosigner(createdCosigner);
  await firestore
    .doc(
      `scopes/public/users/${user.id}/blockchains/symbol/multisigs/${multisig.id}/cosigners/${createdCosigner.id}`,
    )
    .set(publicCosigner);
};
