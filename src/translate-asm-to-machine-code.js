const _get = require("lodash/get");
const InitSymbolTable = require("./init-symbol-table");

const A_INSTRUCTION_PREFIX = "@";
const COMP_BITS = {
  "0": "0101010",
  "1": "0111111",
  "-1": "0111010",
  D: "0001100",
  A: "0110000",
  "!D": "0001101",
  "!A": "0110001",
  "-D": "0001111",
  "-A": "0110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "D+A": "0000010",
  "D-A": "0010011",
  "A-D": "0000111",
  "D&A": "0000000",
  "D|A": "0010101",
  M: "1110000",
  "!M": "1110001",
  "-M": "1110011",
  "M+1": "1110111",
  "M-1": "1110010",
  "D+M": "1000010",
  "D-M": "1010011",
  "M-D": "1000111",
  "D&M": "1000000",
  "D|M": "1010101"
};
const DEST_BITS = {
  M: "001",
  D: "010",
  MD: "011",
  A: "100",
  AM: "101",
  AD: "110",
  AMD: "111"
};
const JUMP_BITS = {
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111"
};
const LABEL_PREFIX = "(";
const RAM_VARIABLE_ADDRESS_START = 16;

class TranslateAsmToMachineCode {
  static perform(asm = []) {
    const symbolTable = InitSymbolTable.perform(asm);
    const machineCode = [];
    let ramAddress = RAM_VARIABLE_ADDRESS_START;
    let binaryStr;
    let symbol;
    let address;

    asm.forEach(line => {
      binaryStr = "";

      if (line.startsWith(LABEL_PREFIX)) return;

      if (line.startsWith(A_INSTRUCTION_PREFIX)) {
        // A Instruction

        symbol = line.substring(1);

        if (this.stringContainsOnlyDigits(symbol)) {
          address = parseInt(symbol);
        } else {
          address = symbolTable[symbol];

          if (typeof address === "undefined") {
            address = ramAddress++;
            symbolTable[symbol] = address;
          }
        }

        binaryStr = address.toString(2).padStart(16, "0");
      } else {
        // C Instruction

        const [preJumpSymbols, jumpSymbols] = line.split(";");
        let [destSymbols, compSymbols] = preJumpSymbols.split("=");
        if (typeof compSymbols === "undefined") {
          let tmp = destSymbols;
          destSymbols = compSymbols;
          compSymbols = tmp;
        }

        const compBits = COMP_BITS[compSymbols];
        const destBits = _get(DEST_BITS, destSymbols, "000");
        const jumpBits = _get(JUMP_BITS, jumpSymbols, "000");
        binaryStr = `111${compBits}${destBits}${jumpBits}`;
      }

      machineCode.push(binaryStr);
    });

    return machineCode;
  }

  static stringContainsOnlyDigits(str) {
    return /^\d+$/.test(str);
  }
}

module.exports = TranslateAsmToMachineCode;
