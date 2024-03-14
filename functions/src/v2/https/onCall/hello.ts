import { functionsV2, CallableRequest } from '@utils/firebase/functions';

export const hello = functionsV2.https.onCall<{ name: string }>(
  {
    region: 'asia-northeast1',
    cors: true,
    memory: '128MiB',
    timeoutSeconds: 3600,
  },
  async (
    request: CallableRequest<{ name: string }>,
  ): Promise<{ message: string }> => {
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

    return { message };
  },
);
