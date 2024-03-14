import {
  functionsV2,
  setFunctionsV2DefaultGlobalOption,
  ScheduledEvent,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 3600,
    memory: '128MiB',
  },
  functionsV2,
);

export const onSchedule = functionsV2.scheduler.onSchedule(
  '* * * * *',
  async (event: ScheduledEvent) => {
    console.dir({ event }, { depth: null });
  },
);
