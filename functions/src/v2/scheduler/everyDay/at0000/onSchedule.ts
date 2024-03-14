import {
  functionsV2,
  setFunctionsV2DefaultGlobalOption,
  ScheduledEvent,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 540,
    memory: '128MiB',
  },
  functionsV2,
);

// Todo: 1日1回未登録ノードの新規ルックアップ処理を追加したい
export const onSchedule = functionsV2.scheduler.onSchedule(
  '0 0 * * *',
  async (event: ScheduledEvent) => {
    console.dir({ event }, { depth: null });
  },
);
