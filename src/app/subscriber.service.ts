import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private _http : HttpClient) { }

  addSubscriber(phone : any) {
    return this._http.post<{message : any}>(environment.baseUrlSubscriber+"subscribe",phone);
  }
}
