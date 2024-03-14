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

export const onObjectMetadataUpdated =
  functionsV2.storage.onObjectMetadataUpdated(async (event: StorageEvent) => {
    if (
      await hasAlreadyTriggered(event.id, 'v2-storage-onObjectMetadataUpdated')
    ) {
      return;
    }
    console.dir({ event }, { depth: null });
  });
