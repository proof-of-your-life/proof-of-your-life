import { getEnv } from '@utils/firebase/functions';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { NamespaceId, PublicAccount, RepositoryFactoryHttp } from 'symbol-sdk';
import { networkNameToType } from '@utils/blockchain/symbol/network/networkNameToType';

export const getPublicAccountFromNamespace = async (
  namespace: string,
  nodeUrl: string,
) => {
  const env = getEnv();
  const networkType = networkNameToType(env.symbol.network);
  const namespaceId = new NamespaceId(namespace);
  const repositoryFactoryHttp = new RepositoryFactoryHttp(nodeUrl);
  const namespaceRepository = repositoryFactoryHttp.createNamespaceRepository();
  const accountRepository = repositoryFactoryHttp.createAccountRepository();
  const address = await firstValueFrom(
    namespaceRepository.getLinkedAddress(namespaceId).pipe(
      timeout(5000),
      catchError(() => of(undefined)),
    ),
  );
  if (!address) {
    return undefined;
  }
  const accountInfo = await firstValueFrom(
    accountRepository.getAccountInfo(address).pipe(
      timeout(5000),
      catchError(() => of(undefined)),
    ),
  );
  if (
    !accountInfo?.publicKey ||
    accountInfo?.publicKey ===
      '0000000000000000000000000000000000000000000000000000000000000000'
  ) {
    return undefined;
  }
  const publicAccount = PublicAccount.createFromPublicKey(
    accountInfo.publicKey,
    networkType,
  );
  return publicAccount;
};
