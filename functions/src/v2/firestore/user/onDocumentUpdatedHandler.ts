import { User } from './user.model';

export const onDocumentUpdatedHandler = (beforeUser: User, afterUser: User) => {
  console.dir({ beforeUser, afterUser }, { depth: null });
};
