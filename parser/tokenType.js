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
};
