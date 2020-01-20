import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { StateService } from '../../shared/state.service';
import { CountryjsonService } from '../../shared/countryjson.service';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';

import{ MatCheckbox } from '@angular/material';
import { CountryService } from 'src/app/shared/country.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(public service: StateService,
    private country : CountryjsonService,
    private countryService: CountryService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<StateComponent>,
    private dialogService: DialogService,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
     }

  activeCountry: any[];
  
  falseValue = 'Inactive'
  trueValue = 'Active';
  modifyTitle: any;
  newTitle: any;
  
  checkboxChange(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    //console.log(checkbox.value);
  }


  ngOnInit() {
    this.service.getStates();
    this.countryService.getActiveCountries().subscribe(
      list => {
        this.activeCountry = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }; 
        });  
        //console.log(this.activeCountry);
      });
      this.modifyTitle = this.translate.instant('state.titleModify')
      this.newTitle = this.translate.instant('state.titleNew')
  }


  /*
  onClear() {
    this.service.form.reset(); 
    this.service.initializeFormGroup();
    this.notificationService.success('Cleared Successfully');
  }
  */ 
 public errorHandling = (control: string, error: string) => {
  return this.service.form.controls[control].hasError(error);
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
      this.notificationService.success(this.translate.instant('notif.submitSuccess'));
      this.onClose();
    }
  }

  onClose() {
    if(!this.service.form.get('$key').value)
    {
      //Create Popup
      if((this.service.form.get('stateName').value || this.service.form.get('countryName').value || this.service.form.get('stateCode').value) == ''){
        //Empty Form
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
      }
      else{
        console.log(this.service.form.value)
        this.dialogService.openConfirmDialog(this.translate.instant('dialog.closeConfirm'))
        .afterClosed().subscribe(res =>{
         if(res){ 
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.dialogRef.close();
          }
        });
      }  
    }
    else
    {
      //Edit Popup
      this.dialogService.openConfirmDialog(this.translate.instant('dialog.closeConfirm'))
      .afterClosed().subscribe(res =>{
        if(res){
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.dialogRef.close();
        }
      });
    }
  }

/*
  Country Json Getter
  getCountries(){
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
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

  } */ 

  

  


}
