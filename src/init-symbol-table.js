const _get = require("lodash/get");

const INIT_SYMBOL_TABLE = {
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576
};
const LABEL_PREFIX = "(";

class InitSymbolTable {
  static perform(asm = []) {
    let romAddress = 0;

    return asm.reduce((acc, line) => {
      if (!line.startsWith(LABEL_PREFIX)) {
        romAddress++;
        return acc;
      }

      const symbol = line.substring(1, line.length - 1);
      acc[symbol] = _get(acc, symbol, romAddress);

      return acc;
    }, Object.assign({}, INIT_SYMBOL_TABLE));
  }
}

module.exports = InitSymbolTable;
