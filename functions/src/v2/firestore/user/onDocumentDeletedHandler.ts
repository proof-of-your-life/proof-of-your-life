import { User } from './user.model';

export const onDocumentDeletedHandler = (deletedUser: User) => {
  console.dir({ deletedUser }, { depth: null });
};
