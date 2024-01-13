/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import './fix-ts-path';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { User } from '@common/src/models/user/user.model';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((_request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  const user: User = {
    id: 'id',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    photoUrl: 'photoUrl',
    nickName: 'nickName',
    birthday: new Date(),
    bio: 'bio',
    google: 'google',
    twitter: 'twitter',
    github: 'github',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  logger.info({ user });
  response.send('Hello from Firebase!');
});
