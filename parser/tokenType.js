export class TokenType {
  constructor(label, conf = {}) {
    let {
      keyword,
      beforeExpr,
      startsExpr,
      isLoop,
      isAssign,
      prefix,
      postfix,
      binop,
    } = conf;
    this.label = label;
    this.keyword = keyword;
    this.beforeExpr = !!beforeExpr;
    this.startsExpr = !!startsExpr;
    this.isLoop = !!isLoop;
    this.isAssign = !!isAssign;
    this.prefix = !!prefix;
    this.postfix = !!postfix;
    this.binop = binop || null;
    this.updateContext = null;
  }
}

function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
const beforeExpr = { beforeExpr: true };
const startsExpr = { startsExpr: true };

export const keywords = {};

function kw(name, options = {}) {
  options.keyword = name;
  return (keywords[name] = new TokenType(name, options));
}

export const types = {
  num: new TokenType("num", startsExpr),
  regExp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  privateId: new TokenType("privateId", startsExpr),
  eof: new TokenType("eof"),
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  questionMark: new TokenType("?", beforeExpr),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backTick: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
  equalTo: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  increment: new TokenType("++", {
    prefix: true,
    postfix: true,
    startsExpr: true,
  }),
  increment: new TokenType("--", {
    prefix: true,
    postfix: true,
    startsExpr: true,
  }),
  prefix: new TokenType("!/~", {
    prefix: true,
    postfix: true,
    startsExpr: true,
  }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {
    beforeExpr: true,
    binop: 9,
    prefix: true,
    startsExpr: true,
  }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  exponent: new TokenType("**", { beforeExpr: true }),
  coalesce: binop("??", 1),
  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", { isLoop: true, beforeExpr: true }),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", { isLoop: true }),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _retturn: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", { isLoop: true }),
  _with: kw("with"),
  _new: kw("new", { beforeExpr: true, startsExpr: true }),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", { beforeExpr: true, binop: 7 }),
  _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true }),
};
