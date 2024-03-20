import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';

export const onDocumentUpdatedHandler = (beforeNode: Node, afterNode: Node) => {
  console.dir({ beforeNode, afterNode }, { depth: null });
};
