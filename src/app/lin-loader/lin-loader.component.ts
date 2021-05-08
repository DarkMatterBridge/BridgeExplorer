import {Component, OnInit} from '@angular/core';
import {FileService} from "../services/file.service";
import {Subject} from "rxjs";
import {LinParserService} from "../lin-parser.service";
import {LinObject} from "../model/LinObject";
import {Hand} from "../model/Hand";
import {Board} from "../model/Board";

@Component({
  selector: 'app-lin-loader',
  templateUrl: './lin-loader.component.html',
  styleUrls: ['./lin-loader.component.scss']
})
export class LinLoaderComponent implements OnInit {

  url = "";
  linContent = "";
  uploadSubject: Subject<string> = new Subject<string>();
  board: Board = new Board();

  constructor(private fileService: FileService, private  linParserService: LinParserService) {
  }

  ngOnInit(): void {
    this.uploadSubject.subscribe(ln => this.parseLinFile(ln));
  }

  parseLinFile(linFileContent: string) {
    this.linContent = linFileContent;
    const linFile = new LinObject(this.linContent);
    this.board = new Board(); // import > to trigger changedetection in child components
    this.board.importLinObject(linFile);
  }

  loadLinFromUrl() {
   let x = window.addEventListener("message", e => this.takeLin(e));
    window.postMessage({
      direction: "from-page-script",
      message: this.url
    }, "*");
    window.removeEventListener("message",e => this.takeLin(e));
  }

  takeLin(event: any){
    if (event.source == window && event.data && event.data.direction == "from-content-script"){
      this.parseLinFile(event.data.message);
    }
  }

  copyAndParse() {
    const c = document.getElementById("lin");
    if (c) {
      this.parseLinFile(c.innerText);
    }
  }

  processFile(input: HTMLInputElement) {
    const files = input.files;
    if (files) {
      this.fileService.uploadLinFile(files[0], this.uploadSubject);
    }
  }

}
