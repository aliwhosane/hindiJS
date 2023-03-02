export const lineBreak = /\r\n?|\n|\u2028|\u2029/
export const lineBreakG = new RegExp(lineBreak.source,"g");
export const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
export const nonAsciiWhietSpace  = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/

export const isNewLine = (code) => {
    return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
}

export const nextNewLine = (code, from, end=code.length) => {
    for (let i=from; i< end; i++) {
        let next = code.charCodeAt(1);
        if(isNewLine(next)) return i < end && next ===13 && code.charCodeAt(i+1) ===  10 ? i+2 : i+1;
    }
    return -1
}