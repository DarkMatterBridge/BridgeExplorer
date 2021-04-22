import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {BiddingSystem} from "../model/BiddingSystem";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";
import {Subject} from "rxjs";
import {FileService} from "../services/file.service";
import {LegacyBiddingSystem} from "../model/LegacyBiddingSystem";

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  bnode!: BNode;
  baseNode!: BNode;

  linContent = "initial";
  subject: Subject<BNode> = new Subject<BNode>();
  bridgeSystem: BiddingSystem;

  uploadSubject: Subject<BNode> = new Subject<BNode>();

  linkableBnodes: BNode[] = new Array();

  constructor(private  bsm: BridgeSystemManager, private fileService: FileService) {
    this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnode(b));
    this.resetSystem();
    this.loadFromLocalStorage();

    this.uploadSubject.subscribe(bn => this.setSystem(bn));

  }

  setSystem(bn: BNode) {
    this.baseNode = this.bnode = bn;
    this.bsm.makeUsable(bn);
  }


  setBnode(bn: BNode | undefined) {
    if (bn === undefined) {
      this.bnode = this.baseNode;
    } else {
      this.bnode = bn;
    }
  }

  getStatistics() {
    const hid =
      this.bsm.determineAndSetHighestId(this.baseNode);
    const nobids =
      this.bsm.getTotalBidList(this.baseNode).size;

    alert("Highest ID: " + hid + " No of bids: " + nobids)
  }

  loadLegacySystem() {
    this.fileService.getLocalBridgeSystem().subscribe(
      (data: {}) => {
        const l = new LegacyBiddingSystem(this.bsm);
        BNode.highestId = -1;
        this.setSystem(l.parseToNew(data));
        this.getStatistics();
        this.resetBidding();
      }
    )
  }

  loadLinExample() {
    window.postMessage({
      direction: "from-page-script",
      message: "Message from the page"
    }, "*");

    // this.fileService.getLinExample().subscribe(
    //   data => alert(data)
    // )
  }

  copyLin() {
    const c = document.getElementById("lin");
    if (c) {
      this.linContent = c.innerText;
    }
  }

  resetSystem() {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.baseNode = this.bridgeSystem.bridgeSystem;
    this.bnode = this.baseNode;
    this.resetBidding();
  }

  loadElementarySystem() {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bridgeSystem.setElementarySystem();
    this.setSystem(this.bridgeSystem.bridgeSystem);
    this.resetBidding();
  }

  saveIntoLocalStorage() {
    let name = "precision";
    this.fileService.saveIntoLocalStorage(name, this.baseNode);
  }

  loadFromLocalStorage() {
    let name = "precision";
    const b = this.fileService.loadFromLocalStorage(name);
    if (b) {
      this.setSystem(b);
      this.resetBidding();
    }
  }

  downloadSystem() {
    let name = "precision";
    this.fileService.downloadSystem(name, this.baseNode)
  }

  processFile(input: HTMLInputElement) {
    const files = input.files;
    if (files) {
      this.fileService.uploadSystem(files[0], this.uploadSubject);
    }
  }

  resetBidding() {
    this.subject.next(undefined);
  }

  ///
  markAsLinkable() {
    this.linkableBnodes.push(this.bnode);
  }

  linkBnode(linkableBnode: BNode | undefined) {
    if (linkableBnode) {
      alert("link added");
      this.bnode.linkedNode = linkableBnode;
      this.bnode.linkedId = linkableBnode.id;
    }
  }

  showStatistics() {

    // this.bsm.getTotalBidList(this.bnode).forEach((a, b) => {
    //   a.ob = a.who ? undefined : true;
    // })
    alert("No of Subnodes: " + this.bsm.getTotalBidList(this.bnode).size);
  }

}
