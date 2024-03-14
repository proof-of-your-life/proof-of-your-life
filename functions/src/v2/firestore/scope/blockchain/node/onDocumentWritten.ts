import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
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
    timeoutSeconds: 3600,
    memory: '128MiB',
  },
  functionsV2,
);

export const onDocumentWritten = functionsV2.firestore.onDocumentWritten(
  'scopes/{scopeId}/blockchains/{blockchainId}/nodes/{nodeId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { scopeId: string; blockchainId: string; nodeId: string }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-blockchain-node-onDocumentWritten',
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

    const beforeNode = converter<Node>().fromFirestore(event.data?.before);
    const afterNode = converter<Node>().fromFirestore(event.data?.after);
    console.dir({ beforeNode, afterNode }, { depth: null });

    if (beforeNode === undefined && afterNode) {
      await onDocumentCreatedHandler(afterNode);
    }

    if (beforeNode && afterNode) {
      onDocumentUpdatedHandler(beforeNode, afterNode);
    }

    if (beforeNode && afterNode === undefined) {
      onDocumentDeletedHandler(beforeNode);
    }
  },
);
