import {BNode} from "./BNode";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {root} from "rxjs/internal-compatibility";

export class LegacyBiddingSystem {

  public systemHierarchy: {[index: string]:any} = {};

  parseToNew(s: {[index: string]:any}) {
    let bnode: BNode = new BNode("Root", [], "", "");
    let rootnodes = Object.getOwnPropertyNames(s);

    console.log(rootnodes);
    rootnodes.forEach(rootnodeName => {
      const rnn = s[rootnodeName];
      bnode.nodes.push(new BNode(rootnodeName, [], "",rnn.hasOwnProperty('Desc') ? rnn['Desc'] :""));
      console.log(rootnodeName + " "+    rnn.hasOwnProperty("Desc"));
    });
    return bnode;
  }

}
