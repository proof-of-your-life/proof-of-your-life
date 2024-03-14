export type Cosigner = {
  id: string; // Note: address

  type: 'cosigner';
  encryptedPrivateKey: string;
  saltHexString: string;
  ivHexString: string;
  publicKey: string;
  address: string;

  userId: string;
  blockchainId: string;

  createdAt: Date;
  updatedAt: Date;
};
export type NewCosigner = Omit<Cosigner, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableCosigner = { id: string } & Partial<NewCosigner>;

export type PublicCosigner = Omit<
  Cosigner,
  'encryptedPrivateKey' | 'saltHexString' | 'ivHexString'
>;
export type NewPublicCosigner = Omit<
  NewCosigner,
  'id' | 'createdAt' | 'updatedAt'
>;
export type UpdatablePublicCosigner = {
  id: string;
} & Partial<PublicCosigner>;

export const convertToPublicCosigner = (cosigner: Cosigner): PublicCosigner => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { encryptedPrivateKey, saltHexString, ivHexString, ...publicCosigner } =
    cosigner;
  return publicCosigner;
};
