import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-node-simple-edit',
  templateUrl: './node-simple-edit.component.html',
  styleUrls: ['./node-simple-edit.component.scss']
})
export class NodeSimpleEditComponent implements OnInit {

  @Input()
  bnode!: BNode;

  constructor() { }

  ngOnInit(): void {
  }

}
