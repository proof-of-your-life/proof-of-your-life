import { User, Multisig } from '@common/src/models';
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
    memory: '256MiB',
  },
  functionsV2,
);

export const onDocumentWritten = functionsV2.firestore.onDocumentWritten(
  'users/{userId}/blockchains/{blockchainId}/multisigs/{multisigId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      {
        userId: string;
        blockchainId: string;
        multisigId: string;
      }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-user-blockchain-multisig-onDocumentWritten',
      )
    ) {
      return;
    }

    const beforeMultisig = converter<Multisig>().fromFirestore(
      event.data?.before,
    );
    const afterMultisig = converter<Multisig>().fromFirestore(
      event.data?.after,
    );
    console.dir({ beforeMultisig, afterMultisig }, { depth: null });

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

    if (beforeMultisig === undefined && afterMultisig) {
      await onDocumentCreatedHandler(user, afterMultisig);
    }

    if (beforeMultisig && afterMultisig) {
      onDocumentUpdatedHandler(user, beforeMultisig, afterMultisig);
    }

    if (beforeMultisig && afterMultisig === undefined) {
      onDocumentDeletedHandler(user, beforeMultisig);
    }
  },
);
