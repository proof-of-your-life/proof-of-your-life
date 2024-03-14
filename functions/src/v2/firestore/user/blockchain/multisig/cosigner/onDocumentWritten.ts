import { User, Multisig, Cosigner } from '@common/src/models';
import { converter } from '@utils/firebase/firestore';
import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  Change,
  DocumentSnapshot,
  FirestoreEvent,
  defineSecret,
} from '@utils/firebase/functions';
import { firestore } from 'firebase-admin';
import { onDocumentCreatedHandler } from './onDocumentCreatedHandler';
import { onDocumentUpdatedHandler } from './onDocumentUpdatedHandler';
import { onDocumentDeletedHandler } from './onDocumentDeletedHandler';

const PAYER_PRIVATE_KEY = defineSecret('PAYER_PRIVATE_KEY');
const DATA_PRIVATE_KEY = defineSecret('DATA_PRIVATE_KEY');

setFunctionsV2DefaultGlobalOption(
  {
    secrets: [PAYER_PRIVATE_KEY, DATA_PRIVATE_KEY],
    region: 'asia-northeast1',
    timeoutSeconds: 120,
    memory: '128MiB',
  },
  functionsV2,
);

export const onDocumentWritten = functionsV2.firestore.onDocumentWritten(
  'users/{userId}/blockchains/{blockchainId}/multisigs/{multisigId}/cosigners/{cosignerId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      {
        userId: string;
        blockchainId: string;
        multisigId: string;
        cosignerId: string;
      }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-user-blockchain-multisig-cosigner-onDocumentWritten',
      )
    ) {
      return;
    }

    const beforeCosigner = converter<Cosigner>().fromFirestore(
      event.data?.before,
    );
    const afterCosigner = converter<Cosigner>().fromFirestore(
      event.data?.after,
    );
    console.dir({ beforeCosigner, afterCosigner }, { depth: null });

    if (event.params.blockchainId !== 'symbol') {
      throw Error('currently only symbol blockchain is supported');
    }

    const user = (
      await firestore()
        .doc(`users/${event.params.userId}`)
        .withConverter(converter<User>())
        .get()
    ).data();
    console.dir({ user }, { depth: null });
    if (!user) {
      throw Error('user not found');
    }

    const multisig = (
      await firestore()
        .doc(
          `users/${event.params.userId}/blockchains/${event.params.blockchainId}/multisigs/${event.params.multisigId}`,
        )
        .withConverter(converter<Multisig>())
        .get()
    ).data();
    console.dir({ multisig }, { depth: null });
    if (!multisig) {
      throw Error('user not found');
    }

    if (beforeCosigner === undefined && afterCosigner) {
      await onDocumentCreatedHandler(user, multisig, afterCosigner);
    }

    if (beforeCosigner && afterCosigner) {
      onDocumentUpdatedHandler(user, multisig, beforeCosigner, afterCosigner);
    }

    if (beforeCosigner && afterCosigner === undefined) {
      onDocumentDeletedHandler(user, multisig, beforeCosigner);
    }
  },
);
