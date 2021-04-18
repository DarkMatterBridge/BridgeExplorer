import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";

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

  saveIntoLocalStorage(name: string, bnode: BNode) {
    const json = this.transformToJson(bnode);
    localStorage.setItem(name, json.toString());
  }

  loadFromLocalStorage(name: string): BNode | undefined {
    const json = localStorage.getItem(name);
    if (json) {
      return JSON.parse(json) as BNode;
    }
    return undefined;
  }

  transformToJson(bnode: BNode): string {
    return JSON.stringify(bnode, ["id", "bid", "con", "desc", "nodes", "ob", "linkedId"]);
  }

  downloadSystem(name: string, bnode: BNode) {
    const json = this.transformToJson(bnode);
    var wea = window.open("", "hallo");
    if (wea) {
      wea.document.write(json);
    }
    var text = json,
      blob = new Blob([text], {type: 'text/plain'}),
      anchor = document.createElement('a');

    anchor.download = bnode.bid+"_"+ (new Date())+".json";
//    anchor.download = "bs.json";
    anchor.href = (window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  uploadSystem(file: File, uploadSubject: Subject<BNode>) {

    const fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      var datae: string | ArrayBuffer | null;
      datae = fileReader.result
      if (datae) {
        const bn = JSON.parse(datae.toString()) as BNode;
        bn.linkedNode = new BNode("1x", new Array<BNode>(), "");
        uploadSubject.next(bn);
      }
    }
    fileReader.readAsText(file);

  }

  uploadLinFile(file: File, uploadSubject: Subject<string>) {

    const fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      var data: string | ArrayBuffer | null;
      data = fileReader.result;
      if (data) {
        uploadSubject.next(data.toString());
      }
    }
    fileReader.readAsText(file);

  }


  //
  // getLinExample() {
  //   return this.http.get("https://www.bridgebase.com/myhands/fetchlin.php?id=1022970755&when_played=1616782848");
  // }


}
