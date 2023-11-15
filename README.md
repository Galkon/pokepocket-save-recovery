# PokePocket Save Recovery
![image](https://i.imgur.com/ZREX209.gif)

If you're like me and you play Pokemon Gen 3 games on the Analogue Pocket, you may have ran into corrupt Save States using GBA cores, and even corrupt in-game saves due to various power on/off or sleep/wake functionality.

This program lets you select an Analogue Pocket .sta save state file for and output the Pokemon save block from it, which you can then place into your core saves folder to recover your corrupt save state.

## How to use it
1. Download the latest release for macOS or Windows [here](https://github.com/Galkon/pokepocket-save-recovery/releases)
2. Accept warnings for "potentially harmful file" (this program is unsigned, but completely safe, but still you will get browser and OS warnings)
3. Install and launch the app
4. Select an .sta file using the Choose file selector in the top right
5. It will attempt to load your save to preview your trainer and team. You can then export the .sav by clicking the Save button in the top right.

You can also load any .sav file to preview any other saves you may have.

---

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

---

## Local development
If you want to run it locally and develop it further, you can run `pnpm start` to launch the app in development mode.

## Credits
- [ads04r](https://github.com/ads04r) for [Gen3Save](https://github.com/ads04r/Gen3Save/tree/master) Python project (base for my JavaScript implementation)
