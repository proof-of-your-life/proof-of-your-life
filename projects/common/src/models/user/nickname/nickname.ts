import { Privacy } from '../../utils';

export type Nickname = {
  id: string;

  nickname: string;

  userId: string;

  privacy: Privacy;
  approved: false;

  createdAt: string;
  updatedAt: string;
};
export type NewNickname = Omit<Nickname, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableNickname = { id: string } & Partial<
  Omit<Nickname, 'createdAt'>
>;

export const convertToPublicNickname = (nickname: Nickname) => {
  if (nickname.privacy === 'PRIVATE') {
    return {
      id: nickname.id,

      userId: nickname.userId,

      privacy: nickname.privacy,
      approved: nickname.approved,

      createdAt: nickname.createdAt,
      updatedAt: nickname.updatedAt,
    };
  } else if (nickname.privacy === 'PUBLIC_OF_CHAIN') {
    return {
      id: nickname.id,

      nickname: nickname.nickname,

      userId: nickname.userId,

      privacy: nickname.privacy,
      approved: nickname.approved,

      createdAt: nickname.createdAt,
      updatedAt: nickname.updatedAt,
    };
  } else if (nickname.privacy === 'PUBLIC_ON_CHAIN_WITH_ENCRYPTION') {
    return {
      id: nickname.id,

      nickname: nickname.nickname,

      userId: nickname.userId,

      privacy: nickname.privacy,
      approved: nickname.approved,

      createdAt: nickname.createdAt,
      updatedAt: nickname.updatedAt,
    };
  } else if (nickname.privacy === 'PUBLIC_ON_CHAIN_WITHOUT_ENCRYPTION') {
    return {
      id: nickname.id,

      nickname: nickname.nickname,

      userId: nickname.userId,

      privacy: nickname.privacy,
      approved: nickname.approved,

      createdAt: nickname.createdAt,
      updatedAt: nickname.updatedAt,
    };
  }
  return {
    id: nickname.id,

    userId: nickname.userId,

    privacy: nickname.privacy,
    approved: nickname.approved,

    createdAt: nickname.createdAt,
    updatedAt: nickname.updatedAt,
  };
};
