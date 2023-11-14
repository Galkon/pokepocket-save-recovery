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

export const validatePkmnBlock = pkmData => {
  // if every byte in the block is zero, the slot is empty
  if (pkmData.every(byte => byte === 0)) {
    return false
  }
  // found a weird case where all bytes except 1 were 0, not sure
  // why or what purpose. the byte was 85 aka 0x55 at index 56
  // @TODO figure this out for reals, for now just skip the block
  if (pkmData.filter(byte => byte === 0).length === pkmData.length - 1) {
    return false
  }
  return true
}
