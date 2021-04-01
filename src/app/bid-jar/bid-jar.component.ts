import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  @Input()
  bnode: BNode;

  constructor() { }

  ngOnInit(): void {
  }

}
