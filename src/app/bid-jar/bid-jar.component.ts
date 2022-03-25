import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BNode} from '../model/BNode';
import {BiddingSystem} from '../model/BiddingSystem';
import {BridgeSystemManager} from '../services/bridge-system-manager.service';
import {Subject} from 'rxjs';
import {FileService} from '../services/file.service';
import {LegacyBiddingSystem} from '../model/LegacyBiddingSystem';
import {BNodeSequence} from '../model/BNodeSequence';

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  bnode!: BNode;
  baseNode!: BNode;

  subject: Subject<BNode> = new Subject<BNode>();
  bridgeSystem: BiddingSystem;

  uploadSubject: Subject<BNode> = new Subject<BNode>();

  linkableBnodes: BNode[] = [];

  dealViewActivated = false;
  bNodeSequence: BNodeSequence = new BNodeSequence();

  editable = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLElement>;

  constructor(private  bsm: BridgeSystemManager, private fileService: FileService) {
    this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnode(b));
    this.resetSystem();
    this.loadFromLocalStorage();

    this.uploadSubject.subscribe(bn => this.setSystem(bn));

  }

  setSystem(bn: BNode): void {
    this.baseNode = this.bnode = bn;
    this.bsm.makeUsable(bn);
  }


  setBnode(bn: BNode | undefined): void {
    if (bn === undefined) {
      this.bnode = this.baseNode;
    } else {
      this.bnode = bn;
    }
  }

  getStatistics(): void {
    const hid =
      this.bsm.determineAndSetHighestId(this.baseNode);
    const nobids =
      this.bsm.getTotalBidList(this.baseNode).size;

    alert('Highest ID: ' + hid + ' No of bids: ' + nobids);
  }

  loadLegacySystem(): void {
    this.fileService.getLocalBridgeSystem().subscribe(
      (data: {}) => {
        const l = new LegacyBiddingSystem(this.bsm);
        BNode.highestId = -1;
        this.setSystem(l.parseToNew(data));
        this.getStatistics();
        this.resetBidding();
      }
    );
  }

  // copyLin() {
  //   const c = document.getElementById("lin");
  //   if (c) {
  //     this.linContent = c.innerText;
  //   }
  // }

  resetSystem(): void {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.baseNode = this.bridgeSystem.bridgeSystem;
    this.bnode = this.baseNode;
    this.resetBidding();
  }

  loadElementarySystem(): void {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bridgeSystem.setElementarySystem();
    this.setSystem(this.bridgeSystem.bridgeSystem);
    this.resetBidding();
  }

  saveIntoLocalStorage(): void {
    const name = 'precision';
    this.fileService.saveIntoLocalStorage(name, this.baseNode);
  }

  loadFromLocalStorage(): void {
    const name = 'precision';
    const b = this.fileService.loadFromLocalStorage(name);
    if (b) {
      this.setSystem(b);
      this.resetBidding();
    }
  }

  downloadSystem(): void {
    const name = 'precision';
    this.fileService.downloadSystem(name, this.baseNode);
  }

  processFile(input: HTMLInputElement): void {
    const files = input.files;
    if (files) {
      this.fileService.uploadSystem(files[0], this.uploadSubject);
    }
  }

  resetBidding(): void {
    this.subject.next(undefined);
  }

  ///
  markAsLinkable(): void {
    this.linkableBnodes.push(this.bnode);
  }

  linkBnode(linkableBnode: BNode | undefined): void {
    if (linkableBnode) {
      this.bnode.linkedNode = linkableBnode;
      this.bnode.linkedId = linkableBnode.id;
    }
    this.bnode = {...this.bnode}; // to trigger the change detection on child component
  }

  showStatistics(): void {

    // this.bsm.getTotalBidList(this.bnode).forEach((a, b) => {
    //   a.ob = a.who ? undefined : true;
    // })
    alert('No of Subnodes: ' + this.bsm.getTotalBidList(this.bnode).size);
  }


  activateDealView2(bns: BNodeSequence): void {
    this.dealViewActivated = true;
    this.bNodeSequence = {...bns} as BNodeSequence;
  }

  triggerFileUpload(): void {
    const el: HTMLElement = this.fileInput.nativeElement;
    el.click();
  }

}
