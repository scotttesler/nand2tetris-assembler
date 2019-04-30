const fs = require("fs");
const COMMENT_PREFIX = "//";

class CleanAsmFile {
  static perform(filename = "") {
    return fs
      .readFileSync(filename, "utf8")
      .split(/[\r\n]+/)
      .reduce((acc, val) => {
        let str = val.replace(/\s/g, "");
        const iComment = str.indexOf(COMMENT_PREFIX);

        if (str.length === 0) return acc;
        if (str.startsWith(COMMENT_PREFIX)) return acc;
        if (iComment !== -1) str = str.substring(0, iComment).trim();

        acc.push(str);

        return acc;
      }, []);
  }
}

module.exports = CleanAsmFile;
