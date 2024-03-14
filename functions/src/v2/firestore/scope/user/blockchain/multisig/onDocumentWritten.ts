import { PublicMultisig } from '@common/src/models';
import { converter } from '@utils/firebase/firestore';
import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  Change,
  DocumentSnapshot,
  FirestoreEvent,
} from '@utils/firebase/functions';
import { onDocumentCreatedHandler } from './onDocumentCreatedHandler';
import { onDocumentUpdatedHandler } from './onDocumentUpdatedHandler';
import { onDocumentDeletedHandler } from './onDocumentDeletedHandler';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 60,
    memory: '128MiB',
  },
  functionsV2,
);

export const onDocumentWritten = functionsV2.firestore.onDocumentWritten(
  'scopes/{scopeId}/users/{userId}/blockchains/{blockchainId}/multisigs/{id}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { scopeId: string; userId: string; blockchainId: string; id: string }
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

    const beforeMultisig = converter<PublicMultisig>().fromFirestore(
      event.data?.before,
    );
    const afterMultisig = converter<PublicMultisig>().fromFirestore(
      event.data?.after,
    );
    console.dir({ beforeMultisig, afterMultisig }, { depth: null });

    if (event.params.scopeId !== 'public') {
      throw Error();
    }

    if (event.params.blockchainId !== 'symbol') {
      throw Error();
    }

    if (beforeMultisig === undefined && afterMultisig) {
      onDocumentCreatedHandler(afterMultisig);
    }

    if (beforeMultisig && afterMultisig) {
      onDocumentUpdatedHandler(beforeMultisig, afterMultisig);
    }

    if (beforeMultisig && afterMultisig === undefined) {
      onDocumentDeletedHandler(beforeMultisig);
    }
  },
);
