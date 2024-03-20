import { PublicUser } from './user.model';

export const onDocumentUpdatedHandler = (
  beforeUser: PublicUser,
  afterUser: PublicUser,
) => {
  console.dir({ beforeUser, afterUser }, { depth: null });
};
