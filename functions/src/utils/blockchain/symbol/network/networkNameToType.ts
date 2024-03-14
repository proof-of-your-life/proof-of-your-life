import { NetworkType } from 'symbol-sdk';

export const networkNameToType = (networkName: string) => {
  return networkName === 'mainnet'
    ? NetworkType.MAIN_NET
    : NetworkType.TEST_NET;
};
