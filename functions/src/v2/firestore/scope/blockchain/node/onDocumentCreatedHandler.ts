import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
import { checkNodeStatus } from '@utils/blockchain/symbol/node/checkNodeStatus';
import { getNodesMaxHeight } from '@utils/blockchain/symbol/node/getNodesMaxHeight';
import { idToHost } from '@utils/blockchain/symbol/node/idToHost';
import { firestore } from '@utils/firebase/admin';
import { converter } from '@utils/firebase/firestore';
import { getEnv } from '@utils/firebase/functions';

export const onDocumentCreatedHandler = async (createdNode: Node) => {
  console.dir({ createdNode }, { depth: null });

  const env = getEnv();
  console.dir({ env }, { depth: null });

  const referencedNodes = (
    await firestore
      .collection('scopes/public/blockchains/symbol/nodes')
      .withConverter(converter<Node>())
      .where('referenced', '==', true)
      .get()
  ).docs
    .map((doc) => doc.data())
    .filter((node) => !!node) as Node[];
  const referencedHeight = await getNodesMaxHeight(referencedNodes);
  const createdNodeStatus = await checkNodeStatus(
    idToHost(createdNode?.id),
    referencedHeight,
    env.symbol.generationHash,
    env.symbol.epochAdjustment,
    env.symbol.currencyMosaicId,
    env.symbol.harvestMosaicId,
  );
  await firestore
    .doc(`scopes/public/blockchains/symbol/nodes/${createdNodeStatus.id}`)
    .withConverter(converter<Node>())
    .set(createdNodeStatus, { merge: true });
};
