import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { AdvertiserService } from '../advertiser.service';
import { SubscriberService } from '../subscriber.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private _subscriberService : SubscriberService, private _adService : AdvertiserService) { }
  profileForm = this.fb.group({
    firstName: ['', Validators.required]
  })
  regForm = this.fb.group({
    mail: ['', Validators.required],
    adTitle: ['', Validators.required],
    adDesc: ['', Validators.required]
  })

  public isSubscribe : boolean = false;
  public isAd : boolean = false;
  public isAdMessage !: String;
  public isSubscribeMessage !: String;

  ngOnInit(): void {
    
  }
  
  onSubmitForm() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.regForm.value);
    this.hideMessages();
    let ad = {
      email: this.regForm.value.mail,
      name: this.regForm.value.adTitle,
      message: this.regForm.value.adDesc
    }
    this._adService.addAd(ad).subscribe( respnse => {
      console.log(respnse);
      this.isAd = true;
      this.isAdMessage = respnse.message;
    },err => {
      console.log(err);
    });
  }
  onSubmit(){
    // console.warn(this.profileForm.value.firstName);
    this.hideMessages();
    let phone : any = this.profileForm.value.firstName;
    let subscriber = {
      phone: phone
    }
    this._subscriberService.addSubscriber(subscriber).subscribe( respnse => {
      console.log(respnse);
      this.isSubscribe = true;
      this.isSubscribeMessage = respnse.message;
    },err => {
      console.log(err);
    });
  }

  hideMessages(){
      this.isSubscribe = false;
      this.isAd = false;
      this.isAdMessage = "";
      this.isSubscribeMessage = "";
  }
}
