const CleanAsmFile = require("./clean-asm-file");
const TranslateAsmToMachineCode = require("./translate-asm-to-machine-code");
const WriteMachineCodeToFile = require("./write-machine-code-to-file");

const ASM_FILE_EXTENSION = ".asm";

class Assembler {
  static perform(asmFilename = "") {
    const asm = CleanAsmFile.perform(asmFilename);
    const machineCode = TranslateAsmToMachineCode.perform(asm);
    const hackFilename = this.createHackFilenameFromAsmFilename(asmFilename);
    WriteMachineCodeToFile.perform(machineCode, hackFilename);
  }

  static createHackFilenameFromAsmFilename(asmFilename = "") {
    const iFileExtension = asmFilename.indexOf(ASM_FILE_EXTENSION);
    const filenameWithoutExtension = asmFilename.substring(0, iFileExtension);
    return `${filenameWithoutExtension}.hack`;
  }
}

module.exports = Assembler;
