import { Cosigner, Multisig } from '@common/src/models';
import { converter, firestore } from '@utils/firebase';

export const getMultisigInfoFromUserId = async (userId: string) => {
  const multisig = (
    await firestore
      .collection(`users/${userId}/blockchains/symbol/multisigs`)
      .withConverter(converter<Multisig>())
      .get()
  ).docs[0].data();
  if (multisig === undefined) {
    throw Error('Multisig not found');
  }
  const cosigners = (
    await firestore
      .collection(
        `users/${userId}/blockchains/symbol/multisigs/${multisig.id}/cosigners`,
      )
      .withConverter(converter<Cosigner>())
      .get()
  ).docs
    .map((docSnapshot) => docSnapshot.data())
    .filter((cosigner) => !!cosigner) as Cosigner[];
  return { multisig, cosigners };
};
