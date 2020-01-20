import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe,private db: AngularFireDatabase) { }

  countryList: AngularFireList<any>;
  activeCountryList: AngularFireList<any>;
  tempCountryList: AngularFireList<any>;


  tempCountry: any;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    countryName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 _-]{2,24}$')]),
    regionName: new FormControl('',Validators.required),
    countryID: new FormControl('',[Validators.required,Validators.max(3),Validators.pattern('^[a-zA-Z0-9 ]{1,3}$')]),
    isActive: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      regionName: '',
      countryName: '',
      countryID: '',
      isActive: false
    });
  }

  getCountries() {
    this.countryList = this.firebase.list('countries');
    return this.countryList.snapshotChanges();
  }

  insertCountry(country) {
    this.countryList.push({
      regionName: country.regionName,
      countryName: country.countryName,
      countryID: country.countryID, 
      isActive: country.isActive
    });
  }

  getActiveCountries(){
    this.activeCountryList = this.firebase.list('countries', ref => ref.orderByChild('isActive').equalTo(true));
    return this.activeCountryList.snapshotChanges();
  }
/*
  checkExist(formValue: string){
    this.tempCountryList = (this.countryList.query.orderByChild('countryName').equalTo(formValue));
    }
*/
  updateCountry(country) {
    this.countryList.update(country.$key,
      {
        regionName: country.regionName, 
        countryName: country.countryName,
        countryID: country.countryID,
        isActive: country.isActive
      });
  }

  deleteCountry($key: string) {
    this.countryList.remove($key);
  }

  populateForm(country) {
    this.form.setValue(country);
  }
  
}
