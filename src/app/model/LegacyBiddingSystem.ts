import {BNode} from "./BNode";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {root} from "rxjs/internal-compatibility";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

export class LegacyBiddingSystem {

  constructor(private  bsm: BridgeSystemManager) {
  }

  public systemHierarchy: { [index: string]: any } = {};

  parseToNew(hierachy: { [index: string]: any }) :BNode {
    let bnode: BNode = new BNode("Root", [], "", "");
    this.parseWorker(bnode, hierachy, true);
    return bnode;
    // let rootnodes = Object.getOwnPropertyNames(s);
    // rootnodes.forEach(rootnodeName => {
    //   const rnn = s[rootnodeName];
    //   const b = new BNode(rootnodeName, [], "", rnn.hasOwnProperty('Desc') ? rnn['Desc'] : "");
    //   bnode.nodes.push(b);
    //
    //   if (rnn.hasOwnProperty('Follow')) {
    //     this.parseWorker(b, rnn['Follow'], true)
    //   }
    //   if (rnn.hasOwnProperty('Opponent')) {
    //     this.parseWorker(b, rnn['Opponent'], false)
    //   }
    //
    //   console.log(rootnodeName + " " + rnn.hasOwnProperty("Desc"));
    // });
    // return bnode;
  }

  public parseWorker(bnode: BNode, hierachy: { [index: string]: any }, who: boolean)  {

    let rootNames = Object.getOwnPropertyNames(hierachy);
    rootNames.forEach(nodeName => {
      const rnn = hierachy[nodeName];
      const childNode = new BNode(nodeName, [], "", rnn.hasOwnProperty('Desc') ? rnn['Desc'] : "");
      childNode.who = who;
      this.bsm.persistNode(childNode);
      bnode.nodes.push(childNode);

      if (rnn.hasOwnProperty('Follow')) {
        this.parseWorker(childNode, rnn['Follow'], true)
      }
      if (rnn.hasOwnProperty('Opponent')) {
        this.parseWorker(childNode, rnn['Opponent'], false)
      }

    });

  }
}
