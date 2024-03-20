export const utf8HexToString = (hex: string) => {
  const str = new TextDecoder().decode(Buffer.from(hex, 'hex'));
  return str;
};
