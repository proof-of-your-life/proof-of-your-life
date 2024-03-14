import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
import { getNodeStatus } from './getNodeStatus';

export const checkNodeStatus = async (
  host: string,
  referencedHeight: number,
  referencedGenerationHash: string,
  referencedEpochAdjustment: number,
  referencedCurrencyMosaicId: string,
  referencedHarvestMosaicId: string,
): Promise<Node> => {
  const node = await getNodeStatus(host);

  if ((node?.height ?? 0) >= referencedHeight) {
    node.synced = true;
  } else {
    node.synced = false;
  }

  if (node.generationHash !== referencedGenerationHash) {
    node.validNetworkProperties = false;
  } else {
    node.validNetworkProperties = true;
  }

  if (node.epochAdjustment !== referencedEpochAdjustment) {
    node.validNetworkProperties = false;
  } else {
    node.validNetworkProperties = true;
  }

  if (node.currencyMosaicId !== referencedCurrencyMosaicId) {
    node.validNetworkProperties = false;
  } else {
    node.validNetworkProperties = true;
  }

  if (node.harvestMosaicId !== referencedHarvestMosaicId) {
    node.validNetworkProperties = false;
  } else {
    node.validNetworkProperties = true;
  }

  return node;
};
