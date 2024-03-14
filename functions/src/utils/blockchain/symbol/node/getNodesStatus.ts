import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
import { getNodeStatus } from './getNodeStatus';
import { idToHost } from './idToHost';

export const getNodesStatus = async (nodes: Node[]): Promise<Node[]> => {
  const nodesStatus = (
    await Promise.all(
      nodes.map(async (node) => {
        try {
          return await getNodeStatus(idToHost(node.id));
        } catch (error) {
          console.error(error);
          return undefined;
        }
      }),
    )
  ).filter((node) => node !== undefined) as Node[];
  return nodesStatus;
};
