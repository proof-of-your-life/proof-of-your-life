export type Multisig = {
  id: string; // Note: address

  type: 'multisig';
  encryptedPrivateKey: string;
  saltHexString: string;
  ivHexString: string;
  publicKey: string;
  address: string;
  minApproval: number;
  minRemoval: number;

  userId: string;
  blockchainId: string;

  createdAt: Date;
  updatedAt: Date;
};
export type NewMultisig = Omit<Multisig, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableMultisig = { id: string } & Partial<
  Omit<Multisig, 'createdAt'>
>;

export type PublicMultisig = Omit<
  Multisig,
  'encryptedPrivateKey' | 'saltHexString' | 'ivHexString'
>;
export type NewPublicMultisig = Omit<
  PublicMultisig,
  'id' | 'createdAt' | 'updatedAt'
>;
export type UpdatablePublicMultisig = {
  id: string;
} & Partial<Omit<PublicMultisig, 'createdAt'>>;

export const convertToPublicMultisig = (multisig: Multisig): PublicMultisig => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { encryptedPrivateKey, saltHexString, ivHexString, ...publicCosigner } =
    multisig;
  return publicCosigner;
};
