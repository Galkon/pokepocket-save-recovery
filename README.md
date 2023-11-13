# PokePocket Save Recovery
<img width="812" alt="image" src="https://github.com/Galkon/pokepocket-save-recovery/assets/1406556/ce415c8b-2c51-4db4-aec6-ff3fc1cac5d6">

If you're like me and you play Pokemon Gen 3 games on the Analogue Pocket, you may have ran into corrupt Save States using GBA cores, and even corrupt in-game saves due to various power on/off or sleep/wake functionality.

This program lets you select an Analogue Pocket .sta save state file for and output the Pokemon save block from it, which you can then place into your core saves folder to recover your corrupt save state.

## How does it work?
- This is an electron app using React for UI
- Interacting with files and decoding them happens in the main process
- The window gets access to IPC functionality via preloading + ContextBridge
- Grab the .sav block data from the .sta file of choice
- Decode it and preview the data in it (character name, gender, pokemon team)
- Export it to .sav file

## Limitations
- Currently only supports Gen 3 (R/S/E + FR/LG)
- Currently only tested with English game save states
  - It should find the save block for any gen 3 game regardless of language, but it is untested.

## Running the program
1. Clone this repository
2. Ensure you have `pnpm` installed, `npm` should also work fine, then run `pnpm install`
3. Run `pnpm run build && pnpm start` to open the app

## Development
If you want to run it locally and develop it further, you can run `pnpm run dev` to launch the app in development mode.

## Credits
- [ads04r](https://github.com/ads04r) for [Gen3Save](https://github.com/ads04r/Gen3Save/tree/master) Python project (base for my JavaScript implementation)
