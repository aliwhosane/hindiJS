import { getOptions } from "./options.js";
import { wordsRegExp } from "./util.js";
import { reservedWords, keywords } from "./identifier.js";

export class Parser {
  constructor(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegExp(
      keywords[
        options.ecmaVersion >= 6
          ? 6
          : options.sourceType === "module"
          ? "5module"
          : 5
      ],
    );
  }
}
