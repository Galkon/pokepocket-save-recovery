export default class Section {
  constructor(slice) {
    this.data = slice;
    this.id = this.data[4096 - 12]; // Technically 2Bytes But the second Byte is never used
    this.checksum = this.data.slice(4096 - 10, 4096 - 8);
    this.validationCode = this.data.slice(4096 - 8, 4096 - 4); // Always 37,32,1,8
    this.saveIndex = this.data.slice(4096 - 4, 4096);
  }
}
