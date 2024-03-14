import { PublicUser } from './user.model';

export const onDocumentDeletedHandler = (deletedUser: PublicUser) => {
  console.dir({ deletedUser }, { depth: null });
};
