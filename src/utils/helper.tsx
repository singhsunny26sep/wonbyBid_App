export const safeMaskString = (input: any): string => {
  // console.log("typeof input: ", typeof input);
  // console.log("input: ", input);

  if (typeof input !== "string" || input?.length < 4) {
    let converted = input?.toString()
    const lengthToMask = converted?.length - 4;
    return "X".repeat(lengthToMask) + converted?.slice(-4);
  }
  const lengthToMask = input.length - 4;
  return "X".repeat(lengthToMask) + input?.slice(-4);
};



export const generateReferralCode = () => {
  return Array.from({ length: 10 }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65) // A-Z (ASCII 65-90)
  ).join('');
};