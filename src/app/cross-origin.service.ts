import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossOriginService {

  function: Function = (s: string) => s;

  constructor(private httpClient: HttpClient) {
    window.addEventListener('message', e => this.processResponse(e));
  }

  loadFromUrlViaMessage(url: string, f: Function): void {
    this.function = f;
    window.postMessage({
      direction: 'from-page-script',
      message: url
    }, '*');
  }


  loadDirectFromUrl(url: string): Observable<any> {
    return this.httpClient.get(url, {responseType: 'text'});
  }

  loadFromUrl(url: string, f: Function): void {
    this.function = f;
    const httpOptions = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      // headers: new HttpHeaders({PHPSESSID: 'vftr8pj7pp15nri476vigt7btq'}),
      // withCredentials: true,
      responseType: 'text'
      // observe: 'response'
    };
    console.log(httpOptions);
    // this.httpClient.get<HttpResponse<string>>(url, {observe: 'response', responseType: undefined}).subscribe((response) => this.processResponse2(response));
    // this.httpClient.get<HttpResponse<any>>(url, httpOptions).subscribe((response: HttpResponse<any>) => this.processResponse2(response));
    this.httpClient.get(url, {responseType: 'text'}).subscribe(response => this.processResponse2(response));
  }

  postToUrl(url: string, f: Function): void {
    this.function = f;
    // let body: any = new HttpParams()
    //   .set('username', 'pfreche')
    //   .set('password', '......');
    // this.httpClient.post(url, body.toString(), {responseType: 'text'}).subscribe(response => this.processResponse2(response));
  }

  xaahttp(url: string, f: Function): void {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // xhr.withCredentials = true;
    // xhr.setRequestHeader("PHPSESSID","faaaak");
    // xhr.setRequestHeader("myhands_token","aaaa");
    // xhr.setRequestHeader("SRV","www2.dal12.sl");
    // xhr.setRequestHeader("_ga","GA1.2.907914249.1621777892");
    // xhr.setRequestHeader("_gid","GA1.2.1270676106.1621777892");
    // xhr.setRequestHeader("X-Referer","");
    xhr.setRequestHeader('Cookie', 'several cookies2');
    xhr.send(null);
  }

  processResponse(event: MessageEvent): void {
    if (event.source === window && event.data && event.data.direction === 'from-content-script') {
      this.function(event.data.message);
    }
  }

  processResponse2(response: Object): void {
    console.log(response);
    alert(response);
    this.function(response);
  }

}
