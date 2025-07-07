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


/* export const isValidURL = (str: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // now required protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}; */
export const isValidURL = (str: string) => {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};


export const shouldBeTrue = (updatedAtStr: any) => {
  const updatedAt: any = new Date(updatedAtStr);
  const now: any = new Date();
  const elapsed = now - updatedAt; // in milliseconds
  return elapsed < 30 * 1000;
}