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

  constructor(private  bsm: BridgeSystemManager, private fileService: FileService) {
    this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnode(b));
    this.resetSystem();
    this.getStatistics();

    // this.fileService.getLocalBridgeSystem().subscribe(
    //   (data: {}) => {
    //     const l = new LegacyBiddingSystem();
    //     BNode.highestId = -1;
    //     this.baseNode = l.parseToNew(data);
    //     this.bnode = this.baseNode;
    //     this.getStatistics();
    //   }
    // )

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
        this.baseNode = l.parseToNew(data);
        this.bnode = this.baseNode;
        this.getStatistics();
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

  loadNewSystem() {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.baseNode = this.bridgeSystem.bridgeSystem;
    this.bnode = this.baseNode;

  }

  resetSystem() {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.baseNode = this.bridgeSystem.bridgeSystem;
    this.bnode = this.baseNode;
  }

  loadElementarySystem() {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bridgeSystem.setElementarySystem();
    this.baseNode = this.bridgeSystem.bridgeSystem;
    this.bnode = this.baseNode;
  }

  saveIntoLocalStorage() {
    let name = "precision";
    this.fileService.saveIntoLocalStorage(name, this.baseNode);
  }

  loadFromLocalStorage() {
    let name = "precision";
    const b = this.fileService.loadFromLocalStorage(name);
    if (b) {
      this.baseNode = b;
      this.bnode = b;
    }
  }

  downloadSystem() {
    let name = "precision";
    this.fileService.downloadSystem(name, this.baseNode)
  }

  processFile(imageInput: HTMLInputElement) {
    // const files = imageInput.files;
    // if (files) {
    //   const file: File = files[0];
    //   const b = this.fileService.uploadSystem(file);
    //   if (b) {
    //     this.baseNode = b;
    //     this.bnode = b;
    //   }
    // }
  }


}
