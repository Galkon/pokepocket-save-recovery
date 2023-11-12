export default class Tools {
  static mergeTyped(...args) {
    let results = [];
    for (const arg of args) {
      const each = Array.from(arg);
      results = results.concat(each);
    }
    return new Uint8Array(results);
  }

  static sumTypedArray(typedArr) {
    const arr = Array.from(typedArr);
    return arr.reduce((a, b) => a + b, 0);
  }

  static makeReadable(typedArr) {
    const offset = typedArr.map((each) => (each >= 187 ? each - 122 : each - 113));
    return String.fromCharCode.apply(null, offset);
  }

  static substructureOrder(personalityValue) {
    const pv32 = new Uint32Array(personalityValue.buffer);
    return pv32;
  }
}
