import {BNode} from "./BNode";

export class BNodeSequence {

  nodes: BNode[] = new Array<BNode>();
  index: number = -1;
  indexNode: BNode | undefined;

  getIndex(bnode: BNode | undefined) {
    return (bnode === undefined) ? -1 : this.nodes.indexOf(bnode);
  }

  addNode(bnode: BNode) {
    this.index = this.getIndex(this.indexNode);
    if (this.index === -1) {
    } else {
      this.cutAt(this.index+1);
    }
    this.nodes.push(bnode);
    this.indexNode = bnode;
  }

  cutAt(i: number) {
    this.nodes = this.nodes.slice(0, i);
  }

  setIndexNode(bnode: BNode) {
    this.indexNode = bnode;
  }
////////
  getNode(i: number) {
    return this.nodes[i];
  }

  reset() {
    this.nodes = new Array<BNode>();
    this.indexNode = undefined;
  }
  getLength(): number {
    return this.nodes.length;
  }

  positionOfBNode(bn: BNode): number {
    return this.nodes.indexOf(bn);
  }

}
