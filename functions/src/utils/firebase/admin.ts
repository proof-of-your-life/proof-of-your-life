import * as admin from 'firebase-admin';

export const app = admin.initializeApp();

export const firestore = admin.firestore();
admin.firestore().settings({ ignoreUndefinedProperties: true });

export const auth = admin.auth();

export const storage = admin.storage();
