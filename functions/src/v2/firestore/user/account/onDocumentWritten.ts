import { Account } from '@common/src/models/user/account/account.model';
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
import { firestore } from 'firebase-admin';
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
  'users/{userId}/accounts/{accountId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { userId: string; accountId: string }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-user-account-onDocumentWritten',
      )
    ) {
      return;
    }

    const beforeAccount = converter<Account>().fromFirestore(
      event.data?.before,
    );
    const afterAccount = converter<Account>().fromFirestore(event.data?.after);
    console.dir({ beforeAccount, afterAccount }, { depth: null });

    const user = (
      await firestore()
        .doc(`users/${event.params.userId}`)
        .withConverter(converter<User>())
        .get()
    ).data();
    if (!user) {
      throw Error('user not found');
    }

    if (beforeAccount === undefined && afterAccount) {
      await onDocumentCreatedHandler(user, afterAccount);
    }

    if (beforeAccount && afterAccount) {
      onDocumentUpdatedHandler(user, beforeAccount, afterAccount);
    }

    if (beforeAccount && afterAccount === undefined) {
      onDocumentDeletedHandler(user, beforeAccount);
    }
  },
);
