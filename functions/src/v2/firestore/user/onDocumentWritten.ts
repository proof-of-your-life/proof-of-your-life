import { User } from '@common/src/models/user/user.model';
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
  'users/{id}',
  async (
    event: FirestoreEvent<Change<DocumentSnapshot> | undefined, { id: string }>,
  ) => {
    if (
      await hasAlreadyTriggered(event.id, 'v2-firestore-user-onDocumentWritten')
    ) {
      return;
    }

    const payerPrivateKey = PAYER_PRIVATE_KEY.value();
    const dataPrivateKey = DATA_PRIVATE_KEY.value();

    const beforeUser = converter<User>().fromFirestore(event.data?.before);
    const afterUser = converter<User>().fromFirestore(event.data?.after);
    console.dir({ beforeUser, afterUser }, { depth: null });

    if (beforeUser === undefined && afterUser) {
      await onDocumentCreatedHandler(
        afterUser,
        payerPrivateKey,
        dataPrivateKey,
      );
    }

    if (beforeUser && afterUser) {
      onDocumentUpdatedHandler(beforeUser, afterUser);
    }

    if (beforeUser && afterUser === undefined) {
      onDocumentDeletedHandler(beforeUser);
    }
  },
);
