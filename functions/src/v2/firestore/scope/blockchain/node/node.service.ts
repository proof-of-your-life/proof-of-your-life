import { firestore } from '@utils/firebase/admin';
import { Node } from './node.model';

export const getRandomNodes = async (limit: number) => {
  const nodes = (
    await firestore
      .collection('scopes/public/blockchains/symbol/nodes')
      .where('https', '==', true)
      .where('wss', '==', true)
      .where('synced', '==', true)
      .where('validNetworkProperties', '==', true)
      .get()
  ).docs
    .map((doc) => doc.data() as Node)
    .filter((node) => !node.disabled);
  const copy = nodes.slice();
  const randomNodes = [...Array(limit)].map(() =>
    copy.splice(Math.floor(Math.random() * copy.length), 1),
  )[0];
  return randomNodes;
};

export const getRandomReferenceNodes = async (limit: number) => {
  const nodes = (
    await firestore
      .collection('scopes/public/blockchains/symbol/nodes')
      .where('referenced', '==', true)
      .where('https', '==', true)
      .where('wss', '==', true)
      .where('synced', '==', true)
      .where('validNetworkProperties', '==', true)
      .get()
  ).docs
    .map((doc) => doc.data() as Node)
    .filter((node) => !node.disabled);
  const copy = nodes.slice();
  const randomNodes = [...Array(limit)].map(() =>
    copy.splice(Math.floor(Math.random() * copy.length), 1),
  )[0];
  return randomNodes;
};
