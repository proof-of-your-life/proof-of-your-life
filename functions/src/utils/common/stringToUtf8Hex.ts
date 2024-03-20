export const stringToUtf8Hex = (str: string): string => {
  const hex = Buffer.from(new TextEncoder().encode(str)).toString('hex');
  return hex;
};
