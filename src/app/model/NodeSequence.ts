import {BNode} from "./BNode";

export class NodeSequence {

  nodes: BNode[] = new Array<BNode>();

  addNode(bnode: BNode) {
    this.nodes.push(bnode);
  }

  getLength(): number {
    return this.nodes.length;
  }

  cutAt(i: number) {
    this.nodes = this.nodes.slice(0, i);
  }

  getNode(i: number) {
    return this.nodes[i];
  }

  reset() {
    this.nodes = new Array<BNode>();
  }

}
