const fs = require("fs");

class WriteMachineCodeToFile {
  static perform(machineCode = [], filename = "") {
    fs.writeFileSync(filename, machineCode.join("\n"));
  }
}

module.exports = WriteMachineCodeToFile;
