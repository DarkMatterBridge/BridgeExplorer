import {Component, OnInit} from '@angular/core';
import {FileService} from "../services/file.service";
import {Subject} from "rxjs";
import {LinParserService} from "../lin-parser.service";
import {LinFile} from "../model/LinFile";
import {Hand} from "../model/Hand";

@Component({
  selector: 'app-lin-loader',
  templateUrl: './lin-loader.component.html',
  styleUrls: ['./lin-loader.component.scss']
})
export class LinLoaderComponent implements OnInit {

  url = "";
  linContent = "";
  uploadSubject: Subject<string> = new Subject<string>();

  southHand: Hand = new Hand();

  constructor(private fileService: FileService, private  linParserService: LinParserService) {
  }

  ngOnInit(): void {
    this.uploadSubject.subscribe(ln => this.parseLinFile(ln));
  }

  parseLinFile(linFile: string) {
    this.linContent = linFile;
    const lp = new LinFile(this.linContent);
    const x = lp.parsed;
    console.log(lp.hands());
    console.log(lp.south())
    let hand = new Hand();
    hand.setHandFromString(lp.south());
    this.southHand = hand;
  }

  loadLinFromUrl() {
    window.postMessage({
      direction: "from-page-script",
      message: this.url
    }, "*");

  }

  copyLin() {
    const c = document.getElementById("lin");
    if (c) {
      this.linContent = c.innerText;
    }
  }

  processFile(input: HTMLInputElement) {
    const files = input.files;
    if (files) {
      this.fileService.uploadLinFile(files[0], this.uploadSubject);
    }
  }

}
