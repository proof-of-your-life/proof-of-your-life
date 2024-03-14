export type Tx = {
  id: string;

  dataPath: string;
  dataType: string;
  data: unknown;
  dataAction: 'CREATE' | 'UPDATE' | 'DELETE';

  payload: string;
  hash: string;
  publicKey: string;
  type: number;
  networkType: number;
  announced: boolean;
  announcedAt: Date | null;
  unconfirmed: boolean;
  unconfirmedAt: Date | null;
  confirmed: boolean;
  confirmedAt: Date | null;
  finalized: boolean;
  finalizedAt: Date | null;
  error: string | null;
  errorAt: Date | null;

  userId: string;
  blockchainId: string;

  createdAt: Date;
  updatedAt: Date;
};
export type NewTx = Omit<Tx, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableTx = { id: string } & Partial<Omit<Tx, 'createdAt'>>;

export type PublicTx = Omit<Tx, 'data'>;
export type NewPublicTx = Omit<NewTx, 'data'>;
export type UpdatablePublicTx = { id: string } & Partial<
  Omit<PublicTx, 'createdAt'>
>;

export const convertToPublicTx = (tx: Tx): PublicTx => {
  delete tx.data;
  return tx;
};
