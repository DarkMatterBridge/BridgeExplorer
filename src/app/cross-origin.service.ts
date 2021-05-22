import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossOriginService {

  function: Function = (s: string) => s;

  constructor(private httpClient: HttpClient) {
    window.addEventListener('message', e => this.processResponse(e));
  }

  loadFromUrlViaMessage(url: string, f: Function) {
    this.function = f;
    window.postMessage({
      direction: 'from-page-script',
      message: url
    }, '*');
  }

  loadDirectFromUrl(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  loadFromUrl(url: string, f: Function): void {
    this.function = f;
    this.httpClient.get(url, {responseType: 'text'}).subscribe(response => this.processResponse2(response));
  }


  processResponse(event: MessageEvent): void {
    if (event.source == window && event.data && event.data.direction == 'from-content-script') {
      this.function(event.data.message);
    }
  }

  processResponse2(response: string): void {
    alert(response);
    this.function(response);
  }

}
