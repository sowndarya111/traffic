import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/operator/do';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  apiUrl: string = 'http://192.168.1.55:3055/api'
  //apiUrl: string = 'http://115.112.122.99:3055/api'
  //apiUrl: string = 'https://trafficsudharo.com/api'
  // /userDetails/adminLogin
  constructor(public http: HttpClient) { }
  get(url) {


    return this.http.get(this.apiUrl + url);
    
  }
  post(url, body) {


    return this.http.post(this.apiUrl + url, body)
  }
  put(url, body) {


    return this.http.put(this.apiUrl + url, body)
  }

  updateT(url,traveller: any, id:any){
    return this.http.put(this.apiUrl + url +id, traveller);
  }

}
