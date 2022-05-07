import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BNode} from '../model/BNode';
import {BiddingSystem} from '../model/BiddingSystem';
import {BridgeSystemManager} from '../services/bridge-system-manager.service';
import {Subject} from 'rxjs';
import {FileService} from '../services/file.service';
import {LegacyBiddingSystem} from '../model/LegacyBiddingSystem';
import {BNodeSequence} from '../model/BNodeSequence';
import {BNodeComposite} from '../model/BNodeComposite';

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  // bnode!: BNode;
  bnc!: BNodeComposite;
  baseNode!: BNode;

  subject: Subject<BNodeComposite> = new Subject<BNodeComposite>();
  bridgeSystem: BiddingSystem;

  uploadSubject: Subject<BNode> = new Subject<BNode>();

  linkableBnodes: BNode[] = [];

  dealViewActivated = false;
  bNodeSequence: BNodeSequence = new BNodeSequence();

  bNodeSequenceForDealView: BNodeSequence = new BNodeSequence();

  editable = false;
  bidEditable = false;
  noNodes = 0;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLElement>;

  constructor(private  bsm: BridgeSystemManager, private fileService: FileService) {
    this.bridgeSystem = new BiddingSystem(bsm);
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnodeFromBelow(b));
    this.resetSystem();
    this.loadFromLocalStorage();
    this.uploadSubject.subscribe(bn => this.setSystem(bn));
  }

  setSystem(bn: BNode): void {
    this.bsm.makeUsable(bn);
    this.baseNode = bn;
    this.bnc = new BNodeComposite(bn);
    // this.setToOpening();  since it does not work
  }

  // 1) called from include Bnode-Sequence.component
  // 2) called from subject event (so from bid item)

  setBnode(bnc: BNodeComposite | undefined): void {
    if (bnc === undefined) {
      this.bnc = new BNodeComposite(this.baseNode);
    } else {
      console.log(bnc);
      this.bnc = bnc;
    }
  }

  setBnodeFromBelow(bnc: BNodeComposite | undefined): void {
    if (bnc === undefined) { // Does this ever occur?
      this.bnc = new BNodeComposite(this.baseNode);
      // this.reset();
      this.bNodeSequence.reset(); // instead of this.reset() ;
    } else {
      this.bNodeSequence.addNode(bnc);
      this.bnc = bnc;
    }
  }

  getStatistics(): void {
    const hid =
      this.bsm.determineAndSetHighestId(this.baseNode);
    const nobids =
      this.bsm.getTotalBidList(this.baseNode).size;

    alert('Highest ID: ' + hid + ' No of bids: ' + nobids);
  }

  // the load function for the legacy format before April 2021
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
    this.bnc = new BNodeComposite(this.baseNode);
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

  showRawSystem(): void {
    const name = 'precision';
    this.fileService.showRawSystem(name, this.baseNode);
  }

  showAllBids(): void {
    const bidList = this.bsm.getTotalBidList(this.baseNode);
    let bl = Array.from(bidList).map(([x, y]) => x + ":" + y.bid + "->" + y.con);
    let text = bl.join('          \n');
    this.fileService.showInNewWindow(text);
    console.log(this.bsm.getAllLinkedNodes(bidList));
  }

  processFile(input: HTMLInputElement): void {  // TODO Bug > does not triggger if file name did not change
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
    this.linkableBnodes.push(this.bnc.bnode);
  }

  linkBnode(linkableBnode: BNode | undefined): void {
    if (linkableBnode) {
      this.bnc.bnode.linkedNode = linkableBnode;
      this.bnc.bnode.linkedId = linkableBnode.id;
    }
    // tslint:disable-next-line:max-line-length
    this.bnc = new BNodeComposite(this.bnc.bnode, this.bnc.bid, this.bnc.lastContractBid,
      this.bnc.contextualizedCondition, this.bnc.handAttributes); // to trigger the change detection on child component
  }

  calcStatistics(): void {
    this.noNodes = this.bsm.getTotalBidList(this.bnc.bnode).size;
  }

  showStatistics(): number {
    // this.bsm.getTotalBidList(this.bnode).forEach((a, b) => {
    //   a.ob = a.who ? undefined : true;
    // })
    this.noNodes = this.bsm.getTotalBidList(this.bnc.bnode).size;
    alert('No of Subnodes: ' + this.noNodes);
    return this.noNodes;
  }

  activateDealView2(bns: BNodeSequence): void {
    this.dealViewActivated = true;
    this.bNodeSequenceForDealView = {...bns} as BNodeSequence; // Attention> this spread construct removes all functions
  }

  triggerFileUpload(): void {
    const el: HTMLElement = this.fileInput.nativeElement;
    el.click();
  }

  editBid(): void {
    if (this.editable) {
      this.bidEditable = true;
    }
  }

  setToOpening(): void {  // todo does not work correctly  - sequence event triggering + buggy behaviour
    this.baseNode.nodes.forEach(n => {
      if (n.bid === 'opening') {
        alert(n.bid);
        const opening = new BNodeComposite(n);
        this.setBnode(opening);
        this.subject.next(opening);
        return;
      }
    });
  }


}
