export type Node = {
  id: string; // Note: This is utf-8 encoded host hex string.

  host?: string;
  port?: number;
  url?: string;
  network?: 'mainnet' | 'testnet';
  generationHash?: string;
  epochAdjustment?: number;
  currencyMosaicId?: string;
  harvestMosaicId?: string;
  nodePublicKey?: string; // Note: /node/info publicKey
  tlsPublicKey?: string; // Note: /node/info nodePublicKey
  https?: boolean;
  wss?: boolean;
  height?: number;
  synced?: boolean;
  validNetworkProperties?: boolean;
  referenced?: boolean;
  disabled?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
};

export type NewNode = Omit<Node, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatableNode = { id: string } & Partial<Omit<Node, 'createdAt'>>;
