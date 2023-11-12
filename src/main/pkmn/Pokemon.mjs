import Tools from '../utils/Tools.mjs'

export default class Pokemon {
  constructor(data) {
    this.data = data;
    this.personality = this.data.slice(0, 4);
    this.otid = this.data.slice(4, 8);
    this.nickname = this.data.slice(8, 18);
    this.lang = this.data.slice(18, 20);
    this.otName = this.data.slice(20, 27);
    this.markings = this.data.slice(27, 28);
    this.checksum = this.data.slice(28, 30);
    this.unknown = this.data.slice(30, 32);
    this.test = Tools.substructureOrder(this.personality);
  }
}
