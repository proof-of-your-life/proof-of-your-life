import { Check } from '@common/src/models/scope/public/blockchain/symbol/node/check/check.model';
import { checkNodeStatus } from '@utils/blockchain/symbol/node/checkNodeStatus';
import { idToHost } from '@utils/blockchain/symbol/node/idToHost';
import { firestore } from '@utils/firebase/admin';
import { getEnv } from '@utils/firebase/functions';

export const onDocumentCreatedHandler = async (createdCheck: Check) => {
  console.dir({ createdCheck }, { depth: null });

  const env = getEnv();
  console.dir({ env }, { depth: null });

  const nodeStatus = await checkNodeStatus(
    idToHost(createdCheck.node.id),
    createdCheck.height,
    env.symbol.generationHash,
    env.symbol.epochAdjustment,
    env.symbol.currencyMosaicId,
    env.symbol.harvestMosaicId,
  );
  console.dir({ nodeStatus }, { depth: null });

  await firestore
    .doc(
      `scopes/public/blockchains/symbol/nodes/${nodeStatus?.id ?? ''}/checks/${
        createdCheck.id
      }`,
    )
    .set({ node: nodeStatus }, { merge: true });

  await firestore
    .doc(`scopes/public/blockchains/symbol/nodes/${nodeStatus?.id ?? ''}`)
    .set(nodeStatus, { merge: true });
};
