const fs = require('fs-extra');

const Generations = {
  GEN_3: {
    start: 0x60F4A,
    end: 0x80F49
  }
}

// Function to extract the save block from .sta to .sav
const exportSaveBlock = async (inputFilePath, outputFilePath, generation = Generations.GEN_3) => {
  let saveBlock
  try {
    const buffer = await fs.readFile(inputFilePath)
    saveBlock = buffer.slice(generation.start, generation.end + 1); // +1 because slice end is exclusive
  } catch (err) {
    throw new Error('Error reading Pocket save file from .sta')
  }
  try {
    // save the file
    await fs.writeFile(outputFilePath, saveBlock)
  } catch (err) {
    throw new Error('Error writing Pokemon save block to .sav')
  }
}

exports.exportSaveBlock = module.exports.exportSaveBlock = exportSaveBlock
