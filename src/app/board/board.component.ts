import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from '../model/Board';
import {CrossOriginService} from '../cross-origin.service';
import {FileService} from '../services/file.service';
import {Subject} from 'rxjs';
import {LinObject} from '../model/LinObject';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input()
  board!: Board;
  biddingBoxVisible = false;

  uploadSubject: Subject<string> = new Subject<string>();

  constructor(private crossOriginService: CrossOriginService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.uploadSubject.subscribe(ln => this.parseLinFile(ln));
  }

  ngOnChanges(): void {
  }

  addBid(bid: string): void {
    this.board.biddingSequence.addBid(bid);
  }

  save(): void {
    this.board.export('board');
  }

  load(): void {
    this.board.importFromLocalStorage('board');
  }

  loadFile(input: HTMLInputElement): void {
    const files = input.files;
    if (files) {
      this.fileService.uploadLinFile(files[0], this.uploadSubject);
    }
  }

  parseLinFile(linFileContent: string): void {
    this.board = new Board(); // import > to trigger changedetection in child components > todo check here
    this.board.importLinObject(new LinObject(linFileContent));
  }

  emitBiddingSequence(): void {
    this.fileService.emitBiddingSequence(this.board.biddingSequence);
  }

}
