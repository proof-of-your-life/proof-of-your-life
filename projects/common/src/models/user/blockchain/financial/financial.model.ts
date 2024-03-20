export type Financial = {
  id: string; // Note: address

  type: 'financial';
  publicKey: string;
  address: string;

  userId: string;
  blockchainId: string;

  default: boolean;

  createdAt: Date;
  updatedAt: Date;
};
export type NewFinancial = Omit<Financial, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableFinancial = { id: string } & Partial<NewFinancial>;

export type PublicFinancial = Financial;
export type NewPublicFinancial = NewFinancial;
export type UpdatablePublicFinancial = UpdatableFinancial;
export const convertToPublicFinancial = (
  financial: Financial,
): PublicFinancial => financial;
