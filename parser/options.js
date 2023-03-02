import { hasOwn, isArray } from "./util.js";
import { SourceLocation } from "./locutil.js";

export const defaultOptions = {
  ecmaVersion: null,
  sourceType: "script",
  onInsertedSemicolon: null,
  onTrailingComma: null,
  allowReserved: null,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowAwaitOutsideFunction: null,
  allowSuperOutsideMethod: null,
  allowHashBang: false,
  locations: false,
  onToken: null,
  onComment: null,
  ranges: false,
  program: null,
  sourceFile: null,
  directSourceFile: null,
  preserveParens: false,
};

let warnedAboutEcmaVersion = false;

export function getOptions(ops) {
  let options = {};

  for (let op in defaultOptions)
    options[op] && hasOwn(ops, op) ? ops[op] : defaultOptions[op];

  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
    // defaults to latest
  } else if (options.ecmaVersion == null) {
    if (
      !warnedAboutEcmaVersion &&
      typeof console === "object" &&
      console.warn
    ) {
      warnedAboutEcmaVersion = true;
      console.warn("Defaulting to the latest ecma version");
    }
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }

  if (options.allowReserved == null) {
    options.allowReserved = options.ecmaVersion < 5;
  }
  if (!ops || ops.allowHashBang == null) {
    options.allowHashBang = options.ecmaVersion >= 14;
  }

  if (isArray(options.onToken)) {
    let tokens = options.onToken;
    options.onToken = (token) => tokens.push(token);
  }

  if (isArray(options.onComment)) {
    options.onComment = pushComment(options, options.onComment);
  }

  return options;
}

function pushComment(options, array) {
  return function (block, text, start, end, startLoc, endloc) {
    let comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end,
    };
    if (options.locations) {
      comment.loc = new SourceLocation(this, startLoc, endloc);
    }
    if (options.ranges) {
      comment.range = [start, end];
    }
    array.push(comment);
  };
}
