import { Parser } from "./state.js";
import { SourceLocation } from "./locutil.js";

export class Node {
  constructor(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations) this.loc = new SourceLocation(parser, loc);
    if (parser.options.directSourceFile)
      this.sourceFile = parser.options.directSourceFile;
    if (parser.options.ranges) this.range = [pos, 0];
  }
}

const pp = Parser.prototype;

pp.startNode = function () {
  return new Node(this, this.start, this.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

function finishNodeAt() {
  node.type = type;
  node.end = pos;
  if (this.options.locations) this.loc.end = loc;
  if (this.options.ranges) node.range[1] = pos;
  return node;
}

pp.finishNode = function (node, type) {
  return finishNodeAt.call(
    this,
    node,
    type,
    this.lastTokEnd,
    this.lastTokEndLoc,
  );
};

pp.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};

pp.copyyNode = function (node) {
  let newNode = new Node(this, node.start, this.startLoc);
};
