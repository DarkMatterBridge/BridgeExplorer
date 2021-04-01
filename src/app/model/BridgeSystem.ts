import {BNode} from "./BNode";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

export class BridgeSystem {

  bridgeSystem: BNode;
  // @ts-ignore
  currentNode: BNode;
  // @ts-ignore
  bidList: Map<number, BNode>;

  constructor(private bsm: BridgeSystemManager) {
    this.setBridgeSystem(this.bridgeSystem = new BNode("", [], "", ""));
  }

  public setBridgeSystem(bs: BNode) {
    this.bridgeSystem = bs;
    this.bsm.determineAndSetHighestId(this.bridgeSystem);
    this.currentNode = this.bridgeSystem;
    this.bidList = this.bsm.getTotalBidList(this.bridgeSystem);
  }

  addNode(bnode: BNode) {
    this.bsm.addNode(this.currentNode, bnode);
  }

  getNodes() {
    return this.currentNode?.nodes;
  }

  selectNode(id: number) {
    const n = this.bsm.getNode(this.bidList, id);
    if (n !== undefined) {
      this.currentNode = n;
    }
  }

}
