import { PublicCosigner } from '@common/src/models';
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
  'scopes/{scopeId}/users/{userId}/blockchains/{blockchainId}/multisigs/{multisigId}/cosigners/{id}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      {
        scopeId: string;
        userId: string;
        blockchainId: string;
        multisigId: string;
        id: string;
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

    const beforeCosigner = converter<PublicCosigner>().fromFirestore(
      event.data?.before,
    );
    const afterCosigner = converter<PublicCosigner>().fromFirestore(
      event.data?.after,
    );
    console.dir({ beforeCosigner, afterCosigner }, { depth: null });

    if (event.params.scopeId !== 'public') {
      throw Error();
    }

    if (event.params.blockchainId !== 'symbol') {
      throw Error();
    }

    if (beforeCosigner === undefined && afterCosigner) {
      onDocumentCreatedHandler(afterCosigner);
    }

    if (beforeCosigner && afterCosigner) {
      onDocumentUpdatedHandler(beforeCosigner, afterCosigner);
    }

    if (beforeCosigner && afterCosigner === undefined) {
      onDocumentDeletedHandler(beforeCosigner);
    }
  },
);
