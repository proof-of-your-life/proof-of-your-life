export const convertHexStringToBuffer = (hexString: string): Buffer => {
  return Buffer.from(hexString, 'hex');
};
