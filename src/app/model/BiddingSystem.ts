import {BNode} from "./BNode";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

export class BiddingSystem {

  bridgeSystem: BNode;
  // @ts-ignore
  currentNode: BNode;
  // @ts-ignore
  bidList: Map<number, BNode>;

  constructor(private bsm: BridgeSystemManager) {
    this.setBridgeSystem(this.bridgeSystem = new BNode("Root", [], "root", ""));
    this.setElementarySystem();
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

  setElementarySystem() {
    this.bridgeSystem.nodes.push(new BNode("opening", [], "opening", ""));
    this.bridgeSystem.nodes.push(new BNode("2T", [], "Stayman", ""));
    let nodes = this.bridgeSystem.nodes[0].nodes;
    nodes.push(new BNode("1T", [], "", "P>15"));
    nodes.push(new BNode("1D", [], "", "P>9, P<16, 2+D"));
    nodes = nodes[0].nodes;
    nodes.push(new BNode("1D", [], "", "P<8"));
    nodes.push(new BNode("1H", [], "", "P>7, P<13"));

    this.bidList = this.bsm.getTotalBidList(this.bridgeSystem);
  }
}
