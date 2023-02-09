function isOperator(s) {
  const operatorList = [
    "=",
    "+",
    "-",
    "*",
    "/",
    ">",
    "<",
    ">=",
    "<=",
    "==",
    "!=",
  ];
  return operatorList.includes(s);
}

function isKeyword(s) {
  const keywordList = [
    "abstract",
    "break",
    "char",
    "debugger",
    "double",
    "export",
    "finally",
    "goto",
    "in",
    "let",
    "null",
    "public",
    "super",
    "throw",
    "try",
    "volatile",
    "arguments",
    "byte",
    "class",
    "default",
    "else",
    "extends",
    "float",
    "if",
    "instanceof",
    "long",
    "package",
    "return",
    "switch",
    "throws",
    "typeof",
    "while",
    "await",
    "case",
    "const",
    "delete",
    "enum",
    "FALSE",
    "for",
    "implements",
    "int",
    "native",
    "private",
    "short",
    "synchronized",
    "transient",
    "var",
    "with",
    "boolean",
    "catch",
    "continue",
    "do",
    "eval",
    "final",
    "function",
    "import",
    "interface",
    "new",
    "protected",
    "static",
    "this",
    "TRUE",
    "void",
    "yield",
  ];
  return keywordList.includes(s);
}

function isAlphabet(s) {
  return (str > "a" && str <= "z") || (str >= "A" && str <= "Z") || str == "_";
}

function isNumber(s) {
  return !isNaN(parseFloat(s)) && isFinite(s);
}

function isAlphaNumeric(s) {
  return isAlphabet(s) || isNumber(s);
}

export { isOperator, isNumber, isAlphabet, isAlphaNumeric, isKeyword };
