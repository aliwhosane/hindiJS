import { nextLineBreak } from "./whitespaces.js";

export class Position {
  constructor(line, col) {
    this.line = line;
    this.column = col;
  }
}

export class SourceLocation {
  constructor(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) this.source = p.sourceFile;
  }
}

export function getLineInfo(input, offset) {
  for (let line = 1, cur = 0; ; ) {
    let nextBreak = nextLineBreak(input, cur, offset);
    if (nextBreak < 0) return new Position(line, offset - cur);
    ++line;
    cur = nextBreak;
  }
}
