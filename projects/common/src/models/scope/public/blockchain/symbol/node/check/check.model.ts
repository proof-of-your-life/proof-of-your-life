import { Node } from '../node.model';

export type Check = {
  id: string;
  node: Node;
  height: number;
  generationHash: string;
  epochAdjustment: number;
  currencyMosaicId: string;
  harvestMosaicId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type NewCheck = Omit<Check, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableCheck = { id: string } & Partial<Omit<Check, 'createdAt'>>;
