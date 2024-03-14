import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
import { getNodesStatus } from './getNodesStatus';

export const getNodesMaxHeight = async (nodes: Node[]): Promise<number> => {
  const nodesStatus = await getNodesStatus(nodes);
  const heights = nodesStatus.map((node) => node?.height ?? 0);
  const maxHeight = heights.reduce((previous, current) =>
    Math.max(previous, current),
  );
  return maxHeight;
};
