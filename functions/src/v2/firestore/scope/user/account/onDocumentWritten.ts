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
  'scopes/{scopeId}/users/{userId}/accounts/{accountId}',
  async (
    event: FirestoreEvent<
      Change<DocumentSnapshot> | undefined,
      { scopeId: string; userId: string; accountId: string }
    >,
  ) => {
    if (
      await hasAlreadyTriggered(
        event.id,
        'v2-firestore-scope-user-account-onDocumentWritten',
      )
    ) {
      return;
    }

    const payerPrivateKey = PAYER_PRIVATE_KEY.value();
    const dataPrivateKey = DATA_PRIVATE_KEY.value();

    const beforeAccount = converter<Account>().fromFirestore(
      event.data?.before,
    );
    const afterAccount = converter<Account>().fromFirestore(event.data?.after);
    console.dir({ beforeAccount, afterAccount }, { depth: null });

    if (event.params.scopeId !== 'public') {
      throw Error('scopeId is not public');
    }

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
      await onDocumentCreatedHandler(
        user,
        afterAccount,
        payerPrivateKey,
        dataPrivateKey,
      );
    }

    if (beforeAccount && afterAccount) {
      onDocumentUpdatedHandler(user, beforeAccount, afterAccount);
    }

    if (beforeAccount && afterAccount === undefined) {
      onDocumentDeletedHandler(user, beforeAccount);
    }
  },
);
