import { User } from '@common/src/models/user/user.model';
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
  'scopes/{scopeId}/users/{id}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { scopeId: string; id: string }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-user-onDocumentWritten',
      )
    ) {
      return;
    }

    const beforeUser = converter<User>().fromFirestore(event.data?.before);
    const afterUser = converter<User>().fromFirestore(event.data?.after);
    console.dir({ beforeUser, afterUser }, { depth: null });

    if (event.params.scopeId !== 'public') {
      console.warn('only public scopeId is supported');
      return;
    }

    if (beforeUser === undefined && afterUser) {
      onDocumentCreatedHandler(afterUser);
    }

    if (beforeUser && afterUser) {
      onDocumentUpdatedHandler(beforeUser, afterUser);
    }

    if (beforeUser && afterUser === undefined) {
      onDocumentDeletedHandler(beforeUser);
    }
  },
);
