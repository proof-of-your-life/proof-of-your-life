import {
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { ulid } from 'ulid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTimestamp = (mayBeTimestamp: any): mayBeTimestamp is Timestamp => {
  return mayBeTimestamp instanceof Timestamp;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertTimestamp = (value: any): any => {
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
    toFirestore: (data: T) => data,
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ) => {
      const data = snapshot.data(options);
      const convertedData = convertTimestamp(data);
      return convertedData as T;
    },
  };
};

export class AutoId {
  static newId(): string {
    return ulid();
  }
}
