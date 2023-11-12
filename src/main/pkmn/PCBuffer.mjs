import Box from './Box.mjs'

export default class PCBuffer {
  constructor(pcBufferSections) {
    this.data = pcBufferSections;
    this.boxs = {};
    if (this.data) {
      const boxPokemonsSlice = this.data.slice(4, 33604);
      const boxNamesSlice = this.data.slice(33604, 33604 + 126);
      const boxWallpapersSlice = this.data.slice(33730, 33730 + 14);
      for (let i = 0; i < 14; i++) {
        this.boxs[i] = new Box(
          boxPokemonsSlice.slice(i * (80 * 30), (i + 1) * (80 * 30)),
          boxNamesSlice.slice(i * 9, (i + 1) * 9),
          boxWallpapersSlice[i]
        );
      }
    }
  }
}
