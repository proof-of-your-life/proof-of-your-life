export type PublicAccount = {
  publicKey: string;
  address: string;
};

export type EncryptedAccount = {
  saltHexString: string;
  ivHexString: string;
  encryptedPrivateKey: string;
  publicKey: string;
  address: string;
};

export type Account = {
  privateKey: string;
  publicKey: string;
  address: string;
};
