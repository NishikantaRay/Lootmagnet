import { Component, OnInit } from '@angular/core';
import { AdvertiserService } from '../advertiser.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data:any[] =[];
  constructor(private _adService : AdvertiserService) { }
  public isSent : boolean = false;
  public isSentMessage !: String;

  ngOnInit(): void {
    this.showAd();
  }

  showAd(){
    this._adService.getAds().subscribe( response => {
      this.data = response.ads;
    },err => {
      console.log(err);
    });
  }

  onVerify(ad : any){
    this._adService.verifyAds(ad.id).subscribe( response => {
      console.log(response);
      this.showAd();
    },err => {
      console.log(err);
    });
  }

  onDecline(ad : any){
    this._adService.declineAds(ad.id).subscribe( response => {
      console.log(response);
      this.showAd();
    },err => {
      console.log(err);
    });
  }

  onSendMessage(){
    this._adService.sendMessage().subscribe( response => {
      console.log(response);
      this.isSent = true;
      this.isSentMessage = response.message;
    },err => {
      console.log(err);
    });
  }

}