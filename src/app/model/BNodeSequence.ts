import {BNode} from "./BNode";

export class BNodeSequence {

  nodes: BNode[] = new Array<BNode>();

  positionOfBNode(bn: BNode): number {
    return this.nodes.indexOf(bn);
  }

  addNode(bnode: BNode) {
    const index = this.positionOfBNode(bnode);
    alert(index);
    if (index === -1) {
      this.nodes.push(bnode);
    } else {
      this.cutAt(index+1);
    }
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
