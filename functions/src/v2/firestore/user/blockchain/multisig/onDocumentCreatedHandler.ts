import { User } from '@common/src/models/user/user.model';
import { firestore } from '@utils/firebase';
import {
  Multisig,
  PublicMultisig,
  convertToPublicMultisig,
} from '@common/src/models';

export const onDocumentCreatedHandler = async (
  user: User,
  createdMultisig: Multisig,
) => {
  console.dir({ user, createdMultisig }, { depth: null });

  const publicMultisig: PublicMultisig =
    convertToPublicMultisig(createdMultisig);
  await firestore
    .doc(
      `scopes/public/users/${user.id}/blockchains/symbol/multisigs/${createdMultisig.id}`,
    )
    .set(publicMultisig);
};
