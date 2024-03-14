import * as fv1 from 'firebase-functions/v1';
import * as fv2 from 'firebase-functions/v2';
import { firestore } from './admin';
import { FieldValue } from 'firebase-admin/firestore';
import { defineString, defineInt } from 'firebase-functions/params';

export { EventContext } from 'firebase-functions/v1';
export { UserRecord } from 'firebase-functions/v1/auth';
export {
  Change,
  DocumentSnapshot,
  FirestoreEvent,
} from 'firebase-functions/v2/firestore';
export { CallableRequest } from 'firebase-functions/v2/https';
export { CloudEvent } from 'firebase-functions/v2';
export { MessagePublishedData } from 'firebase-functions/v2/pubsub';
export { ScheduledEvent } from 'firebase-functions/v2/scheduler';
export { StorageEvent } from 'firebase-functions/v2/storage';
export { Request } from 'firebase-functions/v2/tasks';
export {
  defineString,
  defineInt,
  defineSecret,
} from 'firebase-functions/params';

export const functionsV1 = (
  runtimeOptions: fv1.RuntimeOptions = { memory: '128MB' },
  region: (typeof fv1.SUPPORTED_REGIONS)[number] = 'asia-northeast1',
) => fv1.runWith(runtimeOptions).region(region);

export const setFunctionsV2DefaultGlobalOption = (
  globalOptions: fv2.GlobalOptions,
  functionsV2: typeof fv2,
) => {
  functionsV2.setGlobalOptions(globalOptions);
};

export const functionsV2 = fv2;

export const hasAlreadyTriggered = (eventId: string, suffix: string) => {
  const id = `${eventId}-${suffix}`;
  return firestore.runTransaction(async (transaction) => {
    const triggerEventDocRef = firestore.collection('triggerEvents').doc(id);
    const triggerEventDocumentSnapshot =
      await transaction.get(triggerEventDocRef);
    if (triggerEventDocumentSnapshot.exists) {
      console.log(`Already triggered: ${id}`);
      return true;
    } else {
      transaction.set(triggerEventDocRef, {
        createTime: FieldValue.serverTimestamp(),
      });
      return false;
    }
  });
};

export const getEnv = () => {
  const network = defineString('SYMBOL_NETWORK').value();
  const projectId = defineString('PROJECT_ID').value();
  const projectAcronym = defineString('PROJECT_ACRONYM').value();
  const generationHash = defineString('SYMBOL_GENERATION_HASH').value();
  const epochAdjustment = defineInt('SYMBOL_EPOCH_ADJUSTMENT').value();
  const currencyMosaicId = defineString('SYMBOL_CURRENCY_MOSAIC_ID').value();
  const harvestMosaicId = defineString('SYMBOL_HARVEST_MOSAIC_ID').value();
  const payerAccountNamespace = defineString(
    'SYMBOL_PAYER_ACCOUNT_NAMESPACE',
  ).value();
  const payerAccountAddress = defineString(
    'SYMBOL_PAYER_ACCOUNT_ADDRESS',
  ).value();
  const payerAccountPublicKey = defineString(
    'SYMBOL_PAYER_ACCOUNT_PUBLIC_KEY',
  ).value();
  const dataAccountNamespace = defineString(
    'SYMBOL_DATA_ACCOUNT_NAMESPACE',
  ).value();
  const dataAccountAddress = defineString(
    'SYMBOL_DATA_ACCOUNT_ADDRESS',
  ).value();
  const dataAccountPublicKey = defineString(
    'SYMBOL_DATA_ACCOUNT_PUBLIC_KEY',
  ).value();
  return {
    symbol: {
      projectId,
      projectAcronym,
      network,
      generationHash,
      epochAdjustment,
      currencyMosaicId,
      harvestMosaicId,
      payerAccountNamespace,
      payerAccountAddress,
      payerAccountPublicKey,
      dataAccountNamespace,
      dataAccountAddress,
      dataAccountPublicKey,
    },
  };
};
