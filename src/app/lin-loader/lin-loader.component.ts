import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lin-loader',
  templateUrl: './lin-loader.component.html',
  styleUrls: ['./lin-loader.component.scss']
})
export class LinLoaderComponent implements OnInit {

  url = "";
  linContent = "";

  constructor() { }

  ngOnInit(): void {
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


}
