import { PublicUser } from '@common/src/models';

export const onDocumentCreatedHandler = async (createdUser: PublicUser) => {
  console.dir({ createdUser }, { depth: null });
};
