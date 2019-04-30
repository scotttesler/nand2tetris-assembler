#!/usr/bin/env node

const fs = require("fs");
const Assembler = require("./src/assembler");
const Log = require("logurt");

function getAsmFilenameFromInput() {
  if (process.argv.length < 3) return;
  const asmFn = process.argv[2];
  if (!asmFn.endsWith(".asm")) return;

  return asmFn;
}

(function main() {
  const asmFilename = getAsmFilenameFromInput();

  if (typeof asmFilename === "undefined") {
    Log.error("No .asm file supplied to assembler.");
    return;
  }

  Assembler.perform(asmFilename);
})();
