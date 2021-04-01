import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {

  @Input()
  bnode: BNode;

  constructor() {
  }

  ngOnInit(): void {
  }

}
