export type User = {
  id: string;

  providerId: string;
  displayName: string;
  photoUrl: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;

  privacy: 'PRIVATE';

  createdAt: Date;
  updatedAt: Date;
};
export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatableUser = { id: string } & Partial<Omit<User, 'createdAt'>>;

export type PublicUser = {
  id: string;
  privacy: 'PRIVATE';
  createdAt: Date;
  updatedAt: Date;
};
export type NewPublicUser = Omit<PublicUser, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatablePublicUser = { id: string } & Partial<
  Omit<PublicUser, 'createdAt'>
>;
export const convertToPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    privacy: user.privacy,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
