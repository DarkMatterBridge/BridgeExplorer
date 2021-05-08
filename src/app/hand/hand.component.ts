import {Component, Input, OnInit} from '@angular/core';
import {Hand} from "../model/Hand";

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  symbols = ['♣', '♦', '♥', '♠'].reverse();
  suits = ['S', 'H', 'D', 'C'];

  @Input()
  hand: Hand = new Hand();

  constructor() { }

  ngOnInit(): void {
  }

}
