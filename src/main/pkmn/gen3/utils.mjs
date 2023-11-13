export const readString = (text) => {
  const chars = "0123456789!?.-         ,  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let ret = "";
  for (let i = 0; i < text.length; i++) {
    const c = text.readUInt8(i) - 161;
    if (c < 0 || c >= chars.length) {
      ret += " ";
    } else {
      ret += chars[c];
    }
  }
  return ret.trim();
}
