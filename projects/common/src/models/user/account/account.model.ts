import { Privacy } from '../../utils';

export type Account = {
  id: string;

  providerId: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;

  index: number;
  userId: string;

  privacy: Privacy;
  approved: boolean; // Todo: オンチェーン公開前にはモデレーターやAI等による承認が必要な仕組みを想定

  default: boolean;

  createdAt: Date;
  updatedAt: Date;
};
export type NewAccount = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableAccount = { id: string } & Partial<
  Omit<Account, 'createdAt'>
>;

export type PublicAccount = {
  id: string;

  providerId: string;
  displayName?: string;
  photoUrl?: string;

  index: number;
  userId: string;

  privacy: Privacy;
  approved: boolean;
  default: boolean;

  createdAt: Date;
  updatedAt: Date;
};
export type NewPublicAccount = Omit<
  PublicAccount,
  'id' | 'createdAt' | 'updatedAt'
>;
export type UpdatablePublicAccount = { id: string } & Partial<
  Omit<PublicAccount, 'createdAt'>
>;
export const convertToPublicAccount = (account: Account) => {
  if (account.privacy === 'PRIVATE') {
    return {
      id: account.id,

      providerId: account.providerId,

      index: account.index,
      userId: account.userId,

      privacy: account.privacy,
      approved: account.approved,
      default: account.default,

      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  } else if (account.privacy === 'PUBLIC_OF_CHAIN') {
    return {
      id: account.id,

      providerId: account.providerId,
      displayName: account.displayName,
      photoUrl: account.photoUrl,

      index: account.index,
      userId: account.userId,

      privacy: account.privacy,
      approved: account.approved,
      default: account.default,

      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  } else if (account.privacy === 'PUBLIC_ON_CHAIN_WITH_ENCRYPTION') {
    return {
      id: account.id,

      providerId: account.providerId,
      displayName: account.displayName,
      photoUrl: account.photoUrl,

      index: account.index,
      userId: account.userId,

      privacy: account.privacy,
      approved: account.approved,
      default: account.default,

      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  } else if (account.privacy === 'PUBLIC_ON_CHAIN_WITHOUT_ENCRYPTION') {
    return {
      id: account.id,

      providerId: account.providerId,
      displayName: account.displayName,
      photoUrl: account.photoUrl,

      index: account.index,
      userId: account.userId,

      privacy: account.privacy,
      approved: account.approved,
      default: account.default,

      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
  return {
    id: account.id,

    providerId: account.providerId,

    index: account.index,
    userId: account.userId,

    privacy: account.privacy,
    approved: account.approved,
    default: account.default,

    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
