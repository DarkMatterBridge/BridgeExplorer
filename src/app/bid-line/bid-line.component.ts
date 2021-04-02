import {Component, Input, OnInit, Output} from '@angular/core';
import {BiddingSystem} from "../model/BiddingSystem";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";
import {BNode} from "../model/BNode";
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-bid-line',
  templateUrl: './bid-line.component.html',
  styleUrls: ['./bid-line.component.scss']
})
export class BidLineComponent implements OnInit {

  @Input()
  bnode!: BNode ;

  @Output() selectNode = new EventEmitter<BNode>();


  constructor() {
    this.bnode = new BNode("", [], "","");
  }

  ngOnInit(): void {
  }

  selectBid(bn: BNode) {
    this.selectNode.emit(bn);
  }

}
