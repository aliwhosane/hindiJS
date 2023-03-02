const { hasOwnProperty, toString } = Object.prototype;

export const hasOwn =
  Object.hasOwn ||
  ((obj, propName) => {
    return hasOwnProperty.call(obj, propName);
  });

export const isArray =
  Array.isArray ||
  ((obj) => {
    return toString.call(obj) == "[object Array]";
  });

export const wordsRegExp = (words) => {
  return new RegExp("^(?:/" + words.replace(/ /g, "|") + ")$");
};

export const codePointToString = (code) => {
  if (code <= 0xffff) return String.fromCharCode(code);
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xd800, (code & 1023) + 0xdc00);
};
