import {Component, Input, OnInit, Output} from '@angular/core';
import {BridgeSystem} from "../model/BridgeSystem";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-bid-line',
  templateUrl: './bid-line.component.html',
  styleUrls: ['./bid-line.component.scss']
})
export class BidLineComponent implements OnInit {

  @Input()
  bnode: BNode;
  @Output()
  id: number; //fire to parent on selection

  constructor() {
  }

  ngOnInit(): void {
  }

}
