import { getNodesMaxHeight } from '@utils/blockchain/symbol/node/getNodesMaxHeight';
import { firestore } from '@utils/firebase/admin';
import { converter } from '@utils/firebase/firestore';
import {
  functionsV2,
  setFunctionsV2DefaultGlobalOption,
  ScheduledEvent,
  getEnv,
} from '@utils/firebase/functions';
import { Node } from '@v2/firestore/scope/blockchain/node/node.model';
import { getRandomReferenceNodes } from '@v2/firestore/scope/blockchain/node/node.service';

setFunctionsV2DefaultGlobalOption(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 540,
    memory: '256MiB',
  },
  functionsV2,
);

// Note: trigger periodic nodes monitoring tasks
export const onSchedule = functionsV2.scheduler.onSchedule(
  '0 * * * *',
  async (event: ScheduledEvent) => {
    console.dir({ event }, { depth: null });

    const env = getEnv();
    console.dir({ env }, { depth: null });

    const allNodes = (
      await firestore
        .collection('scopes/public/blockchains/symbol/nodes')
        .withConverter(converter<Node>())
        .get()
    ).docs
      .map((doc) => doc.data())
      .filter((node) => !!node) as Node[];

    const referencedNodes = await getRandomReferenceNodes(3);
    const notReferencedNodes = allNodes.filter((node) => !node.referenced);

    const height = await getNodesMaxHeight(referencedNodes);
    console.dir({ height }, { depth: null });

    const checks = notReferencedNodes.map((node) => {
      return {
        id: event.scheduleTime,
        node,
        height,
        generationHash: env.symbol.generationHash,
        epochAdjustment: env.symbol.epochAdjustment,
        currencyMosaicId: env.symbol.currencyMosaicId,
        harvestMosaicId: env.symbol.harvestMosaicId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    console.dir({ checks }, { depth: null });

    let batch = firestore.batch();
    let count = 0;
    for (const check of checks) {
      const checkDocRef = firestore.doc(
        `scopes/public/blockchains/symbol/nodes/${check.node.id}/checks/${check.id}`,
      );
      batch.set(checkDocRef, check);
      count++;
      if (count >= 500) {
        await batch.commit();
        batch = firestore.batch();
        count = 0;
      }
    }
    if (count > 0) {
      await batch.commit();
    }
  },
);
