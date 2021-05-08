import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrossOriginService {

  function: Function = (s: string) => s;

  constructor() {
    window.addEventListener("message", e => this.processResponse(e));
  }

  loadFromUrl(url: string, f: Function) {
    this.function = f;
    window.postMessage({
      direction: "from-page-script",
      message: url
    }, "*");
  }

  processResponse(event: MessageEvent) {
    if(event.source == window && event.data && event.data.direction == "from-content-script")
    {
      this.function(event.data.message);
    }
  }

}
