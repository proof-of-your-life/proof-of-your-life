import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  StorageEvent,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 3600,
    memory: '128MiB',
  },
  functionsV2,
);

export const onObjectDeleted = functionsV2.storage.onObjectDeleted(
  async (event: StorageEvent) => {
    if (await hasAlreadyTriggered(event.id, 'v2-storage-onObjectDeleted')) {
      return;
    }
    console.dir({ event }, { depth: null });
  },
);
