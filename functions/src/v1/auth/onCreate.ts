import {
  functionsV1,
  hasAlreadyTriggered,
  EventContext,
  UserRecord,
} from '@utils/firebase/functions';
import { firestore } from '@utils/firebase/admin';
import { User } from '@v2/firestore/user/user.model';
import { converter } from '@utils/firebase/firestore';

export const onCreate = functionsV1()
  .auth.user()
  .onCreate(
    async (
      userRecord: UserRecord,
      context: EventContext<Record<string, string>>,
    ) => {
      if (await hasAlreadyTriggered(context.eventId, 'v1-auth-onCreate')) {
        return;
      }
      console.dir({ userRecord }, { depth: null });
      console.dir({ context }, { depth: null });

      const userDocRef = firestore
        .doc(`users/${userRecord.uid}`)
        .withConverter(converter<User>());
      const userDocSnapshot = await userDocRef.get();

      // Note: if user exists already, do nothing.
      const exists = userDocSnapshot.exists;
      if (exists) {
        console.log('User already exists');
        return;
      }

      // Note: if user does not exist, create a new user.
      const now = new Date();
      const user: User = {
        id: userRecord.uid,
        providerId: userRecord.providerData[0].providerId,
        displayName: userRecord.displayName ?? '',
        photoUrl: userRecord.photoURL ?? '',
        email: userRecord.email ?? '',
        emailVerified: userRecord.emailVerified,
        phoneNumber: userRecord.phoneNumber ?? '',
        privacy: 'PRIVATE',
        createdAt: now,
        updatedAt: now,
      };
      console.dir({ user }, { depth: null });
      await userDocRef.set(user);
    },
  );
