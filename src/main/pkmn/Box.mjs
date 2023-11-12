import Pokemon from './Pokemon.mjs'

export default class Box {
  constructor(pokemons, name, wallpaper) {
    this.name = name;
    this.wallpaper = wallpaper;
    this.pokemons = {};

    if (pokemons) {
      for (let i = 0; i < 30; i++) {
        const pkm = pokemons.slice(i * 80, (i + 1) * 80);
        if (pkm[28] !== 0) this.pokemons[i] = new Pokemon(pkm);
      }
    }
  }
}
