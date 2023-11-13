export const Languages = {
  ENGLISH: 'english',
  GERMAN: 'german',
}

export const Generations = {
  GEN_1: 'gen1',
  GEN_2: 'gen2',
  GEN_3: 'gen3',
}

/**
 * Hex offsets for where each block of data lives in the save files, per generation.
 * @type {{'[Generations.GEN_1]': {PLAYER_NAME: number, MONEY: number, CHECKSUM: number, BADGES: number, PIKACHU_FRIENDSHIP: number, CASINO_COINS: number, TIME_PLAYED: number, CURRENT_POKEMON_BOX_NUM: number, CURRENT_POKEMON_BOX: number, POKEDEX_SEEN: number, OPTIONS: number, POKEMON_PARTY: number, ITEM_PC: number, RIVAL_NAME: number, ITEM_BAG: number, POKEDEX_OWNED: number, POKEMON_PC_SECOND_HALF: number, BOX_TWO: number, CURRENT_BOX: number, PLAYER_ID: number, POKEMON_PC_FIRST_HALF: number, BOX_ONE: number}}}
 */
export const SAVE_FILE_OFFSETS = {
  [Generations.GEN_1]: {
    PLAYER_NAME: 0x2598,
    POKEDEX_OWNED: 0x25A3,
    POKEDEX_SEEN: 0x25B6,
    ITEM_BAG: 0x25C9,
    MONEY: 0x25F3,
    RIVAL_NAME: 0x25F6,
    OPTIONS: 0x2601,
    BADGES: 0x2602,
    PLAYER_ID: 0x2605,
    PIKACHU_FRIENDSHIP: 0x271C,
    ITEM_PC: 0x27E6,
    CURRENT_POKEMON_BOX_NUM: 0x284C,
    CURRENT_BOX: 0x30C0,
    CASINO_COINS: 0x2850,
    TIME_PLAYED: 0x2CED,
    POKEMON_PARTY: 0x2F2C,
    CURRENT_POKEMON_BOX: 0x30C0,
    CHECKSUM: 0x3523,
    POKEMON_PC_FIRST_HALF: 0x4000,
    POKEMON_PC_SECOND_HALF: 0x6000,
    BOX_ONE: 0x4000,
    BOX_TWO: 0x4462,
  },
}

export const TYPES = {
  [Generations.GEN_1]: {
    0x00: 'Normal',
    0x01: 'Fighting',
    0x02: 'Flying',
    0x03: 'Poison',
    0x04: 'Ground',
    0x05: 'Rock',
    0x07: 'Bug',
    0x08: 'Ghost',
    0x14: 'Fire',
    0x15: 'Water',
    0x16: 'Grass',
    0x17: 'Electric',
    0x18: 'Psychic',
    0x19: 'Ice',
    0x1A: 'Dragon'
  }
}

/**
 * These are specific to Analogue Pocket .sta files.
 * @type {{'[Generations.GEN_3]': {precedingChunk: string, expectedSize: number, blockSize: number}}}
 */
export const STA_SAVE_BLOCKS = {
  [Generations.GEN_3]: { // https://www.reddit.com/r/AnaloguePocket/comments/10ampwi/solution_for_extracting_pokemon_emerald_cartridge/
    precedingChunk: 'a0003001000c0000a0003001000c0001',
    blockSize: 0x1FFFF,
    expectedSize: 131072,
  },
}
