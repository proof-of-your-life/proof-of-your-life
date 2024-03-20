import { Check } from '@common/src/models/scope/public/blockchain/symbol/node/check/check.model';
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
    timeoutSeconds: 120,
    memory: '256MiB',
  },
  functionsV2,
);

export const onDocumentWritten = functionsV2.firestore.onDocumentWritten(
  'scopes/{scopeId}/blockchains/{blockchainId}/nodes/{nodeId}/checks/{checkId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { scopeId: string; blockchainId: string; nodeId: string; checkId: string }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-blockchain-node-check-onDocumentWritten',
      )
    ) {
      return;
    }

    if (
      event.params.scopeId !== 'public' ||
      event.params.blockchainId !== 'symbol'
    ) {
      console.error('Invalid scopeId or blockchainId node');
      return;
    }

    const beforeCheck = converter<Check>().fromFirestore(event.data?.before);
    const afterCheck = converter<Check>().fromFirestore(event.data?.after);
    console.dir({ beforeCheck, afterCheck }, { depth: null });

    if (beforeCheck === undefined && afterCheck) {
      await onDocumentCreatedHandler(afterCheck);
    }

    if (beforeCheck && afterCheck) {
      onDocumentUpdatedHandler(beforeCheck, afterCheck);
    }

    if (beforeCheck && afterCheck === undefined) {
      onDocumentDeletedHandler(beforeCheck);
    }
  },
);
