# PokePocket Save Recovery
If you're like me and you play Pokemon Gen 3 games on the Analogue Pocket, you may have ran into corrupt Save States using GBA cores, and even corrupt in-game saves due to various power on/off or sleep/wake functionality.

This program lets you select an Analogue Pocket .sta save state file for and output the Pokemon save block from it, which you can then place into your core saves folder to recover your corrupt save state.

## How does it work?
This is an electron app using react for UI. It is extremely simple, and just uses the renderer to communicate via preloaded IPC functionality to interact with the file system.

It will take whatever .sta file you select, grab the data from starting offset `0x60F4A` to `0x80F49` and export that as a .sav file.

## Running the program
1. Clone this repository
2. Ensure you have `pnpm` installed, `npm` should also work fine
3. Run `pnpm run build && pnpm start` to open the app

## Development
If you want to run it locally and develop it further, you can run `pnpm run dev` to launch the app in development mode.
