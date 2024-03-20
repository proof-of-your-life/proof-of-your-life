import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  StorageEvent,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 540,
    memory: '128MiB',
  },
  functionsV2,
);

export const onObjectArchived = functionsV2.storage.onObjectArchived(
  async (event: StorageEvent) => {
    if (await hasAlreadyTriggered(event.id, 'v2-storage-onObjectArchived')) {
      return;
    }
    console.dir({ event }, { depth: null });
  },
);
