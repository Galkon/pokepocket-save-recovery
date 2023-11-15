export const Generations = {
  GEN_1: 'gen1',
  GEN_2: 'gen2',
  GEN_3: 'gen3',
}

/**
 * These are specific to Analogue Pocket .sta files.
 * @type {{'[Generations.GEN_3]': {precedingChunk: string, blockSize: number}}}
 */
export const STA_SAVE_BLOCKS = {
  [Generations.GEN_1]: {
    // @todo verify preceding chunk
    blockSize: 0x8000, // 32,768 bytes
  },
  [Generations.GEN_2]: {
    // @todo verify preceding chunk
    blockSize: 0x8000, // 32,768 bytes
  },
  [Generations.GEN_3]: { // https://www.reddit.com/r/AnaloguePocket/comments/10ampwi/solution_for_extracting_pokemon_emerald_cartridge/
    precedingChunk: 'a0003001000c0000a0003001000c0001',
    blockSize: 0x1FFFF, // 131,072 bytes
  },
}
