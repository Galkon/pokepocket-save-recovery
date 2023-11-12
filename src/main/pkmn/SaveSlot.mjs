// SaveSlot Object. Up to 2 save slots per game save.
import Tools from '../utils/Tools.mjs'
import PCBuffer from './PCBuffer.mjs'
import Section from './Section.mjs'

export default class SaveSlot {
  constructor(arrayBuffer, slotInt) {
    this.sections = {};

    // Prevents error if save is only one SaveSlot big
    if (slotInt === 1 && arrayBuffer.byteLength === 65536) return;

    // Generate Section objects and append to SaveSlot
    const arrayBufferTyped = new Uint8Array(arrayBuffer);
    for (let i = 0 + slotInt * 16; i < 16 + slotInt * 16; i++) {
      const sectionSlice = new Section(arrayBufferTyped.slice(i * 4096, (i + 1) * 4096));
      // Add to sections if key doesn't exist.
      // It can due to: furlocks-forest.net/wiki/?page=Pokemon_GBA_Save_Format
      if (
        !this.sections.hasOwnProperty(sectionSlice.id) ||
        Tools.sumTypedArray(sectionSlice.saveIndex) >
        Tools.sumTypedArray(this.sections[sectionSlice.id].saveIndex)
      ) {
        this.sections[sectionSlice.id] = sectionSlice;
      }
    }

    // only run if initialized with data
    if (arrayBuffer) {
      this.pcBuffer = new PCBuffer(
        Tools.mergeTyped(
          this.sections['5'].data.slice(0, 3968),
          this.sections['6'].data.slice(0, 3968),
          this.sections['7'].data.slice(0, 3968),
          this.sections['8'].data.slice(0, 3968),
          this.sections['9'].data.slice(0, 3968),
          this.sections['10'].data.slice(0, 3968),
          this.sections['11'].data.slice(0, 3968),
          this.sections['12'].data.slice(0, 3968),
          this.sections['13'].data.slice(0, 2000)
        )
      );
    }
  }
}
