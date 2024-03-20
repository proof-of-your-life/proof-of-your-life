import { Node } from '@common/src/models/scope/public/blockchain/symbol/node/node.model';
import { catchError, firstValueFrom, of, tap, timeout } from 'rxjs';
import { RepositoryFactoryHttp } from 'symbol-sdk';
import { hostToId } from './hostToId';

export const getNodeStatus = async (host: string): Promise<Node> => {
  const id = hostToId(host);
  const port = 3001;
  const url = `https://${host}:${port}`;
  console.log({ url });

  const node: Node = {
    id,
    host,
    port,
    url,
    network: undefined,
    generationHash: undefined,
    https: false,
    wss: false,
    height: 0,
    synced: false,
  };

  const repositoryFactoryHttp = new RepositoryFactoryHttp(url);
  const nodeRepository = repositoryFactoryHttp.createNodeRepository();
  const chainRepository = repositoryFactoryHttp.createChainRepository();
  const listener = repositoryFactoryHttp.createListener();

  const nodeInfoStartTime = new Date();
  const nodeInfo = await firstValueFrom(
    nodeRepository.getNodeInfo().pipe(
      timeout(5000),
      catchError((error) => {
        console.warn(error);
        return of(undefined);
      }),
    ),
  );
  const nodeInfoEndTime = new Date();
  const nodeInfoTime = nodeInfoEndTime.getTime() - nodeInfoStartTime.getTime();
  console.dir({ nodeInfo, nodeInfoTime }, { depth: null });
  if (!nodeInfo) {
    node.https = false;
    node.wss = false;
    node.height = 0;
    node.synced = false;
    node.updatedAt = new Date();
    console.dir({ node }, { depth: null });
    return node;
  }
  node.generationHash = nodeInfo.networkGenerationHashSeed;
  node.https = true;
  node.nodePublicKey = nodeInfo.publicKey;
  node.tlsPublicKey = nodeInfo.nodePublicKey;

  const epochAdjustmentStartTime = new Date();
  const epochAdjustment = await firstValueFrom(
    repositoryFactoryHttp.getEpochAdjustment().pipe(
      timeout(5000),
      catchError((error) => {
        console.warn(error);
        return of(undefined);
      }),
    ),
  );
  const epochAdjustmentEndTime = new Date();
  const epochAdjustmentTime =
    epochAdjustmentEndTime.getTime() - epochAdjustmentStartTime.getTime();
  console.dir({ epochAdjustment, epochAdjustmentTime }, { depth: null });
  if (!epochAdjustment) {
    node.https = false;
    node.wss = false;
    node.height = 0;
    node.synced = false;
    node.updatedAt = new Date();
    console.dir({ node }, { depth: null });
    return node;
  }
  node.epochAdjustment = epochAdjustment;

  const networkCurrenciesStartTime = new Date();
  const networkCurrencies = await firstValueFrom(
    repositoryFactoryHttp.getCurrencies().pipe(
      timeout(5000),
      catchError((error) => {
        console.warn(error);
        return of(undefined);
      }),
    ),
  );
  const networkCurrenciesEndTime = new Date();
  const networkCurrenciesTime =
    networkCurrenciesEndTime.getTime() - networkCurrenciesStartTime.getTime();
  console.dir({ networkCurrencies, networkCurrenciesTime }, { depth: null });
  if (!networkCurrencies) {
    node.https = false;
    node.wss = false;
    node.height = 0;
    node.synced = false;
    node.updatedAt = new Date();
    console.dir({ node }, { depth: null });
    return node;
  }
  node.currencyMosaicId = networkCurrencies.currency.mosaicId?.toHex();
  node.harvestMosaicId = networkCurrencies.harvest.mosaicId?.toHex();

  const chainInfoStartTime = new Date();
  const chainInfo = await firstValueFrom(
    chainRepository.getChainInfo().pipe(
      timeout(5000),
      catchError((error) => {
        console.warn(error);
        return of(undefined);
      }),
    ),
  );
  const chainInfoEndTime = new Date();
  const chainInfoTime =
    chainInfoEndTime.getTime() - chainInfoStartTime.getTime();
  console.dir({ chainInfo, chainInfoTime }, { depth: null });
  if (!chainInfo) {
    node.https = false;
    node.wss = false;
    node.height = 0;
    node.synced = false;
    node.updatedAt = new Date();
    console.dir({ node }, { depth: null });
    return node;
  }
  node.height = chainInfo.height.compact();

  await listener.open();
  const newBlock = await firstValueFrom(
    listener.newBlock().pipe(
      tap((newBlock) => console.dir({ newBlock }, { depth: null })),
      timeout(90000),
      catchError(() => of(undefined)),
    ),
  );
  if (newBlock) {
    node.wss = true;
  }
  node.updatedAt = new Date();

  return node;
};
