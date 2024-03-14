import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';

export const onDocumentDeletedHandler = (deletedNode: Node) => {
  console.dir({ deletedNode }, { depth: null });
};
