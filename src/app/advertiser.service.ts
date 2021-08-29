import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserService {

  constructor(private _http : HttpClient) { }

  addAd(ad : any) {
    return this._http.post<{message : any}>(environment.baseUrlAd+"sendAds",ad);
  }

  getAds(){
    return this._http.get<{message:any,ads:any}>(environment.baseUrlAd+"getAds");
  }

  verifyAds(id : any){
    return this._http.get(environment.baseUrlAd+"verifyAds/"+id);
  }

  declineAds(id : any){
    return this._http.delete(environment.baseUrlAd+"deleteAd/"+id);
  }

  sendMessage(){
    console.log("message sending");
    return this._http.get<{message : any}>(environment.baseUrlAd+"sendMessages");
  }

  getVerifiedAds(){
    return this._http.get<{message:any,ads:any}>(environment.baseUrlAd+"getVerfiedAds");
  }
}
