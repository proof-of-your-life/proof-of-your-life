import { firestore } from '@utils/firebase/admin';
import { getRandomNodes } from '@v2/firestore/scope/blockchain/node/node.service';
import { Address, RepositoryFactoryHttp, SignedTransaction } from 'symbol-sdk';
import { User } from '@common/src/models/user/user.model';
import { Tx } from '@common/src/models/user/tx/tx.model';
import { converter } from '@utils/firebase/firestore';
import { filter, firstValueFrom, merge, tap } from 'rxjs';

export const announceWithRandomNodes = async (
  signedTx: SignedTransaction,
  user: User,
  dataPath: string,
  dataType: string,
  data: unknown,
  dataAction: 'CREATE' | 'UPDATE' | 'DELETE',
) => {
  const payload = signedTx.payload;
  const hash = signedTx.hash;
  const publicKey = signedTx.signerPublicKey;
  const type = signedTx.type;
  const networkType = signedTx.networkType;
  const id = hash;
  const now = new Date();

  const tx: Tx = {
    id,

    dataPath,
    dataType,
    data,
    dataAction,

    payload,
    hash,
    publicKey,
    type,
    networkType,
    announced: false,
    announcedAt: null,
    unconfirmed: false,
    unconfirmedAt: null,
    confirmed: false,
    confirmedAt: null,
    finalized: false,
    finalizedAt: null,
    error: null,
    errorAt: null,

    userId: user.id,
    blockchainId: 'symbol',

    createdAt: now,
    updatedAt: now,
  };
  await firestore
    .doc(`users/${user.id}/txs/${signedTx.hash}`)
    .withConverter(converter<Tx>())
    .set(tx);

  const randomNodes = await getRandomNodes(3);
  console.dir({ randomNodes });

  const repositoryFactoryHttps = randomNodes.map(
    (node) => new RepositoryFactoryHttp(node.url as string),
  );
  const listeners = repositoryFactoryHttps.map((repositoryFactoryHttp) =>
    repositoryFactoryHttp.createListener(),
  );
  await Promise.any(listeners.map((listener) => listener.open()));
  listeners.map((listener) => {
    if (listener.isOpen()) {
      listener
        .newBlock()
        .subscribe((newBlock) => console.dir({ newBlock }, { depth: null }));
    }
  });
  const statusErrors$ = listeners
    .map((listener) => {
      if (listener.isOpen()) {
        return listener
          .status(Address.createFromPublicKey(publicKey, networkType))
          .pipe(
            filter((txStatusError) => txStatusError.hash === signedTx.hash),
            tap((txStatusError) => {
              console.error({ txStatusError });
              listener.close();
            }),
          );
      }
      return undefined;
    })
    .filter((statusError$) => !!statusError$);
  const statusError$ = merge(...statusErrors$);
  const unconfirmedTxs$ = listeners
    .map((listener) => {
      if (listener.isOpen()) {
        return listener
          .unconfirmedAdded(Address.createFromPublicKey(publicKey, networkType))
          .pipe(
            filter(
              (unconfirmedTx) =>
                unconfirmedTx.transactionInfo?.hash === signedTx.hash,
            ),
            tap((unconfirmedTx) => {
              console.dir({ unconfirmedTx }, { depth: null });
              firestore
                .doc(`users/${user.id}/txs/${signedTx.hash}`)
                .set(
                  {
                    unconfirmed: true,
                    unconfirmedAt: new Date(),
                  },
                  { merge: true },
                )
                .then((res) => {
                  console.dir(res);
                });
            }),
          );
      }
      return undefined;
    })
    .filter((unconfirmedTx$) => !!unconfirmedTx$);
  const unconfirmedTx$ = merge(...unconfirmedTxs$);
  const confirmedTxs$ = listeners
    .map((listener) => {
      if (listener.isOpen()) {
        return listener
          .confirmed(Address.createFromPublicKey(publicKey, networkType))
          .pipe(
            filter(
              (confirmedTx) =>
                confirmedTx.transactionInfo?.hash === signedTx.hash,
            ),
            tap((confirmedTx) => {
              console.dir({ confirmedTx }, { depth: null });
              firestore
                .doc(`users/${user.id}/txs/${signedTx.hash}`)
                .set(
                  {
                    confirmed: true,
                    confirmedAt: new Date(),
                  },
                  { merge: true },
                )
                .then((res) => {
                  console.dir(res);
                });
              listener.close();
            }),
          );
      }
      return undefined;
    })
    .filter((confirmedTx$) => !!confirmedTx$);
  const confirmedTx$ = merge(...confirmedTxs$);

  const txRepositories = repositoryFactoryHttps.map((repositoryFactoryHttp) =>
    repositoryFactoryHttp.createTransactionRepository(),
  );
  const txAnnounceResponses$ = txRepositories
    .map((txRepository) => {
      return txRepository.announce(signedTx).pipe(
        tap((announceResult) => {
          console.dir({ announceResult }, { depth: null });
          firestore
            .doc(`users/${user.id}/txs/${signedTx.hash}`)
            .set(
              {
                announced: true,
                announcedAt: new Date(),
              },
              { merge: true },
            )
            .then((res) => {
              console.dir(res);
            });
        }),
      );
    })
    .filter((txAnnounceResponse$) => !!txAnnounceResponse$);
  const txAnnounceResponse$ = merge(...txAnnounceResponses$);

  try {
    statusError$.subscribe((txStatusError) => {
      throw Error(JSON.stringify(txStatusError));
    });
    const txResults = await Promise.all([
      firstValueFrom(unconfirmedTx$),
      firstValueFrom(confirmedTx$),
      firstValueFrom(txAnnounceResponse$),
    ]);
    return txResults;
  } catch (error) {
    await firestore
      .doc(`users/${user.id}/txs/${signedTx.hash}`)
      .withConverter(converter<Tx>())
      .set(
        {
          error: (error as Error).message,
          errorAt: new Date(),
        },
        { merge: true },
      );
    return error;
  }
};
