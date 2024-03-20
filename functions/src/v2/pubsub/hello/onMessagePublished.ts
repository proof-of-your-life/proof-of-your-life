import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  CloudEvent,
  MessagePublishedData,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 540,
    memory: '128MiB',
  },
  functionsV2,
);

export const onMessagePublished = functionsV2.pubsub.onMessagePublished(
  'hello',
  async (event: CloudEvent<MessagePublishedData<{ name: string }>>) => {
    if (
      await hasAlreadyTriggered(event.id, 'v2-pubsub-hello-onMessagePublished')
    ) {
      return;
    }
    console.dir({ event }, { depth: null });

    const name = event.data.message.json.name;
    if (!name) {
      console.error('name is not found');
      return;
    }
    const message = `Hello ${name}!`;

    console.log({ message });
  },
);
