import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { StateService } from '../../shared/state.service';
import { CountryService } from '../../shared/country.service';
import { NotificationService } from '../../shared/notification.service';

import{MatCheckbox} from '@angular/material';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(public service: StateService,
    private country : CountryService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<StateComponent>) { }

  countryInfo: any[] = [];
  countryCode: any[] = [];
  I: string;
  Tempc: any;
  
  falseValue = 'Inactive'
  trueValue = 'Active';
  
  checkboxChange(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    console.log(checkbox.value);
  }


  ngOnInit() {
    this.service.getStates();
    this.getCountries();
    this.I = null; 
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Cleared Successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
      {
        this.service.insertState(this.service.form.value); 
      }
      else
      this.service.updateState(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }


  //Country Json Getter
  getCountries(){
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
        this.countryCode=data2.Countries;
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete') 
    )
  }

  onChangeCountry(countryValue) {
    this.countryCode=this.countryInfo[countryValue].CountryCode;
    console.log(this.countryCode);
    this.I = this.countryCode.toString();

  }

  

  


}
