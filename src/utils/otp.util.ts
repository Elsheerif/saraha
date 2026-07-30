export const createOtp = (digits = 6): string => {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
