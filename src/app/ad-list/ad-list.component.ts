import { Component, OnInit } from '@angular/core';
import { AdvertiserService } from '../advertiser.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  data:any[] =[];
  constructor(private _adService : AdvertiserService) { }

  ngOnInit(): void {
    this.getVerifiedAds();
  }

  getVerifiedAds(){
    this._adService.getVerifiedAds().subscribe(
      res => {
        this.data = res.ads;
        console.log(this.data);
      },
      err => console.log(err)
    )
  }

}
