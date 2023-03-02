import Sweeper from "./sweeper.js";
import fs from "fs";
import { keywordMap } from "./keywordMap.js";

const log = console.log;

const buffer = fs.readFileSync("./sample.hs").toString();
const sweeper = Sweeper.getInstance();
const tokens = sweeper.generateToken(buffer);

tokens.map((token) => {
  if (token.type == "KEYWORD") {
    let newvalue = keywordMap[token.value];
    token.value = newvalue;
  }
  fs.writeFileSync("test/converted.js", token.value + " ", {
    encoding: "utf8",
    flag: "a+",
    mode: 0o666,
  });
});

log(" successfully converted to JS!!");
