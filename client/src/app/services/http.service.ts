import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly url: string = environment.baseUrl;
  private token: string;
  public headers: HttpHeaders;
  private headerOptions: any = {
    "Content-Type": "application/json"
  };
  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.token = this.sharedService.getLocalStorage('token');
    this.headers = new HttpHeaders(this.headerOptions);
  }

  getServiceCall(getUrl: string) {
    return this.http.get(this.url + getUrl, { headers: this.headers });
  }

  postServiceCall(postUrl: string, body, token: boolean) {
    this.token = this.sharedService.getLocalStorage('token');
    if (token) {
      this.headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + this.token
      });
    } else {
      this.headers = new HttpHeaders({
        "Accept": "application/json",
      });
    }
    return this.http.post(this.url + postUrl, body, { headers: this.headers });
  }
}
