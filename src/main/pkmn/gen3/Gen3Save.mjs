import {readString, validatePkmnBlock} from './utils.mjs'
import Gen3Pokemon from './Gen3Pokemon.mjs'
import fs from 'fs'

export class Gen3Save {
  constructor({fileName, buffer}) {
    this.game = null
    this.name = null
    this.gender = null
    this.teamcount = null
    this.team = []
    this.boxes = []
    this.time = 0

    const data = buffer ?? fs.readFileSync(fileName);
    const filea = data.slice(0, 57344);
    const fileb = data.slice(57344, 114688);

    const a = this.#getIndex(filea);
    const b = this.#getIndex(fileb);
    let savedata;

    if (a[0] < b[0]) {
      savedata = fileb;
      this.time = b[1];
    } else if (a[0] > b[0]) {
      savedata = filea;
      this.time = a[1];
    } else {
      if (a[1] < b[1]) {
        savedata = fileb;
        this.time = b[1];
      } else {
        savedata = filea;
        this.time = a[1];
      }
    }

    this.#process(savedata);
  }

  #getIndex(data) {
    let ret = [];

    for (let i = 0; i < 14; i++) {
      const ix = i * 4096;
      const section = data.slice(ix, ix + 4096);
      const footer = section.slice(4084);
      const id = footer.readUInt16LE(0);
      const index = footer.readUInt32LE(4);
      let ds = 0;

      if (id === 0) {
        ds = {
          hours: section.readUInt16LE(14),
          minutes: section.readUInt8(16),
          seconds: section.readUInt8(17)
        };
        const dt = (ds.hours * 3600) + (ds.minutes * 60) + ds.seconds;
        ret = [index, dt];
      }
    }

    return ret;
  }

  #process(savedata) {
    const sections = new Array(14).fill(null);
    for (let i = 0; i < 14; i++) {
      const ix = i * 4096;
      const section = savedata.slice(ix, ix + 4096);
      const footer = section.slice(4084);
      const id = footer.readUInt16LE(0);
      sections[id] = section.slice(0, 3968);
    }

    this.name = readString(sections[0].slice(0, 7));

    const gamecode = sections[0].readUInt32LE(172);
    this.game = 'emerald';
    if (gamecode === 0) {
      this.game = 'rubysapphire';
    } else if (gamecode === 1) {
      this.game = 'fireredleafgreen';
    }

    let teamoffset;
    if (this.game === 'fireredleafgreen') {
      this.teamcount = sections[1].readUInt32LE(52);
      teamoffset = 56;
    } else {
      this.teamcount = sections[1].readUInt32LE(564);
      teamoffset = 568;
    }

    const gender = sections[0][8];
    this.gender = gender === 0 ? 'boy' : 'girl';

    // Assuming `sections` is an array of Buffers representing different parts of the Pokémon save data
    let dex = Buffer.alloc(0);
    for (let i = 5; i < 14; i++) {
      dex = Buffer.concat([dex, sections[i]]);
    }
    dex = dex.slice(4, 33604); // Assuming you want to skip the first 4 bytes and get the next 33600 bytes

    for (let i = 0; i < 420; i++) {
      const pkmData = dex.slice(i * 80, (i + 1) * 80);
      if (!validatePkmnBlock(pkmData)) {
        continue;
      }
      const pkm = new Gen3Pokemon(pkmData);
      if (pkm.species) { // Assuming that the Gen3Pokemon constructor assigns a species if valid
        this.boxes.push(pkm);
      }
    }

    for (let i = 0; i < this.teamcount; i++) {
      const offset = teamoffset + (i * 100);
      const pkmData = sections[1].slice(offset, offset + 80);
      if (!validatePkmnBlock(pkmData)) {
        continue;
      }
      const pkm = new Gen3Pokemon(pkmData);
      if (pkm.species) {
        this.team.push(pkm);
      }
    }
  }
}
