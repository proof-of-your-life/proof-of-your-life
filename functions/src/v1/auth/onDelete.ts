import {
  functionsV1,
  hasAlreadyTriggered,
  EventContext,
  UserRecord,
} from '@utils/firebase/functions';

export const onDelete = functionsV1()
  .auth.user()
  .onDelete(
    async (
      userRecord: UserRecord,
      context: EventContext<Record<string, string>>,
    ) => {
      if (await hasAlreadyTriggered(context.eventId, 'v1-auth-onDelete')) {
        return;
      }
      console.dir(userRecord, { depth: null });
      console.log(context), { depth: null };
    },
  );
