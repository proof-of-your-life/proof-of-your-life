import { ulid } from 'ulid';
import { Timestamp } from 'firebase-admin/firestore';
import {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from 'firebase-functions/v2/firestore';
export { Timestamp } from 'firebase-admin/firestore';

const isTimestamp = (mayBeTimestamp: unknown): mayBeTimestamp is Timestamp => {
  return mayBeTimestamp instanceof Timestamp;
};

const convertTimestamp = (value: unknown): unknown => {
  if (typeof value === 'object' && value !== null) {
    if (isTimestamp(value)) {
      return value.toDate();
    }
    if (Array.isArray(value)) {
      return value.map(convertTimestamp);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertedObject = {} as any;
    for (const [key, val] of Object.entries(value)) {
      convertedObject[key] = convertTimestamp(val);
    }
    return convertedObject;
  }
  return value;
};

export const converter = <T>() => {
  return {
    toFirestore: (data: T): T => data,
    fromFirestore: (
      snapshot: QueryDocumentSnapshot | DocumentSnapshot | undefined,
    ) => {
      if (!snapshot) {
        return undefined;
      }
      const data = snapshot.data();
      const convertedData = convertTimestamp(data);
      return convertedData as T;
    },
  };
};

export const autoId = (): string => {
  return ulid();
};
