import fs from 'fs-extra'
import {Generations, STA_SAVE_BLOCKS} from '../../shared/constants.mjs'
import SaveSlot from '../pkmn/SaveSlot.mjs'

function bufferToHexString(buffer) {
  return Array.from(new Uint8Array(buffer), byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

// extract the save block from .sta to .sav
export const exportSaveBlock = async (
  inputFilePath,
  outputFilePath,
  generation = Generations.GEN_3
) => {
  let saveBlock
  try {
    const buffer = await fs.readFile(inputFilePath)
    const fileContent = buffer.toString('hex'); // Convert the buffer to a hexadecimal string
    const targetPattern = STA_SAVE_BLOCKS[generation].precedingChunk
    const lastIndexOfHex = fileContent.lastIndexOf(targetPattern) + targetPattern.length
    const saveBlockStartIndex = Number(`0x${(lastIndexOfHex / 2).toString(16)}`)
    const saveBlockEndIndex = saveBlockStartIndex + STA_SAVE_BLOCKS[generation].blockSize
    saveBlock = buffer.slice(saveBlockStartIndex, saveBlockEndIndex + 1); // +1 because slice end is exclusive
  } catch (err) {
    console.error(err)
    throw new Error('Error reading Pocket save file from .sta')
  }
  try {
    // save the file
    await fs.writeFile(outputFilePath, saveBlock)
  } catch (err) {
    console.error(err)
    throw new Error('Error writing Pokemon save block to .sav')
  }
}
