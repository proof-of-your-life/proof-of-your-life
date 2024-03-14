import {
  functionsV2,
  hasAlreadyTriggered,
  setFunctionsV2DefaultGlobalOption,
  Request,
} from '@utils/firebase/functions';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 540,
    memory: '128MiB',
  },
  functionsV2,
);

export const onTaskDispatched = functionsV2.tasks.onTaskDispatched<{
  name: string;
}>(async (request: Request<{ name: string }>) => {
  if (
    await hasAlreadyTriggered(request.id, 'v2-tasks-hello-onTaskDispatched')
  ) {
    return;
  }

  console.dir(request, { depth: null });

  const auth = request.auth;
  if (!auth?.uid) {
    throw new functionsV2.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.',
    );
  }

  if (!request.data.name) {
    throw new functionsV2.https.HttpsError(
      'invalid-argument',
      'The function must be called with "name" set to a string.',
    );
  }

  const message = `Hello ${request.data.name}`;
  console.dir({ message }, { depth: null });
});
