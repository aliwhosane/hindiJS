import { isNumber, isAlphaNumeric, isKeyword, isOperator } from "./util.js";

class Sweeper {
  constructor() {
    this.instance = null;
    this.tokens = [];
  }

  static getInstance() {
    if (!this.instance) this.instance = new Sweeper();
    return this.instance;
  }

  generateToken(str) {
    let s = "";
    for (let i = 0; i < str.length; i++) {
      s += str[i];
      s = s.trim();
      const peek = str[i + 1];

      if (s[0] == '"') {
        if (s[s.length - 1] == '"' && s.length > 1) {
          this.tokens.push({ type: "STRING", value: s });
          s = "";
        }
        continue;
      }

      if (isNumber(s.trim()) && !isNumber(peek)) {
        this.tokens.push({ type: "NUMBER", value: s.trim() });
        s = "";
      }

      if (s.trim() == "(" || s.trim() == ")") {
        s.trim() == "("
          ? this.tokens.push({ type: "LPAREN", value: s.trim() })
          : this.tokens.push({ type: "RPAREN", value: s.trim() });
        s = "";
      }

      if (s.trim() == "{" || s.trim() == "}") {
        s.trim() == "{"
          ? this.tokens.push({ type: "LBRACE", value: s.trim() })
          : this.tokens.push({ type: "RBRACE", value: s.trim() });
        s = "";
      }

      if (isAlphaNumeric(s.trim()) && !isAlphaNumeric(peek)) {
        if (isKeyword(s.trim())) {
          this.tokens.push({ type: "KEYWORD", value: s });
        } else {
          this.tokens.push({ type: "VARIABLES", value: s });
        }
        s = "";
      }

      if (isOperator(s.trim()) && !isOperator(peek)) {
        this.tokens.push({ type: "OPERATOR", value: s.trim() });
        s = "";
      }

      if (s == ";" || s == "\n") {
        this.tokens.push({ type: "EOL", value: s });
        s = "";
      }
      if (s == ".") {
        this.tokens.push({ type: "ACCESSOR", value: s });
        s = "";
      }
    }
    this.tokens.push({ type: "EOF" });
    return this.tokens;
  }
}

export default Sweeper;
