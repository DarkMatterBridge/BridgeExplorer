import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BNode} from "../model/BNode";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  bridgeSystemUrl = 'assets/bridgePrecision.json';
  public systemHierarchy: { [index: string]: any } = {};
  public bnode!: BNode;

  private newSystem!: BNode;

  constructor(private http: HttpClient) {
  }

  // loadSystem() {
  //   var getter = this.getLocalBridgeSystem();
  //   getter.subscribe(
  //     (data: {}) => {
  //       this.systemHierarchy = data;
  //       const l = new LegacyBiddingSystem();
  //       this.bnode = l.parseToNew(this.systemHierarchy);
  //     }
  //   );
  //   return getter;
  // }

  getLocalBridgeSystem() {
    return this.http.get(this.bridgeSystemUrl);
  }

  // parseLegacySystem() :BNode{
  //   let leg : LegacyBiddingSystem = new LegacyBiddingSystem();
  //   leg.systemHierarchy = this.systemHierarchy;
  //   console.log(this.systemHierarchy);
  //   return leg.parseToNew(this.systemHierarchy);
  //
  // }

  saveIntoLocalStorage(name: string, bnode: BNode) {
    const json = JSON.stringify(bnode, ["id", "bid", "condition", "description", "nodes", "who"]);
    localStorage.setItem(name, json.toString());
  }


  loadFromLocalStorage(name: string): BNode | undefined {
    const json = localStorage.getItem(name);
    if (json) {
      return JSON.parse(json) as BNode;
    }
    return undefined;
  }

}
