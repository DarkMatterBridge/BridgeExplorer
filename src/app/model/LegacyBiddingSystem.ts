import {BNode} from "./BNode";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {root} from "rxjs/internal-compatibility";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

export class LegacyBiddingSystem {

  constructor(private  bsm: BridgeSystemManager) {
  }

  public systemHierarchy: { [index: string]: any } = {};

  parseToNew(hierachy: { [index: string]: any }): BNode {
    let bnode: BNode = new BNode("Root", [], "");
    this.parseWorker(bnode, hierachy, undefined);
    return bnode;
  }

  public parseWorker(bnode: BNode, hierachy: { [index: string]: any }, ob: boolean | undefined) {

    let rootNames = Object.getOwnPropertyNames(hierachy);
    rootNames.forEach(nodeName => {
      const rnn = hierachy[nodeName];
      const childNode = new BNode(nodeName, [], rnn.hasOwnProperty('Desc') ? rnn['Desc'] : "");
      childNode.ob = ob;
      this.bsm.persistNode(childNode);
      bnode.nodes.push(childNode);

      if (rnn.hasOwnProperty('Follow')) {
        this.parseWorker(childNode, rnn['Follow'], undefined)
      }
      if (rnn.hasOwnProperty('Opponent')) {
        this.parseWorker(childNode, rnn['Opponent'], true);
      }

    });

  }
}
