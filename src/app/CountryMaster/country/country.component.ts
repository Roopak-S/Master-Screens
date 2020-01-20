import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CountryService } from '../../shared/country.service';
import { RegionService } from '../../shared/region.service';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import{ MatCheckbox } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(public service: CountryService,
    private region : RegionService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CountryComponent>,
    private dialogService: DialogService,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
     }

  regionInfo: any[] = [];
  regionCode: any[] = [];
  tempRegionName: string;
  modifyTitle: any;
  newTitle: any;
  
  falseValue = 'Inactive'
  trueValue = 'Active';
  
  checkboxChange(checkbox: MatCheckbox, checked: boolean) {
    checkbox.value = checked ? this.trueValue : this.falseValue;
    console.log(checkbox.value);
  }


  ngOnInit() {
    this.service.getCountries();
    this.getRegions();
    
    this.modifyTitle = this.translate.instant('country.titleModify')
    this.newTitle = this.translate.instant('country.titleNew')
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
        this.service.insertCountry(this.service.form.value); 
      }
      else
      this.service.updateCountry(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(this.translate.instant('notif.submitSuccess'));
      this.onClose();
    }
  } 

  onClose() {
    if(!this.service.form.get('$key').value)
    {
      console.log(this.service.form.value)
      //Create Popup
      if((this.service.form.get('regionName').value || this.service.form.get('countryName').value || this.service.form.get('countryID').value) == ''){
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



  //Country Json Getter
  getRegions(){
    this.region.allRegions().
    subscribe(
      data2 => {
        this.regionInfo=data2.Regions;
        this.regionCode=data2.Regions;
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete') 
    )
  }
/*
  onChangeCountry(countryValue) {
    this.countryCode=this.countryInfo[countryValue].CountryCode;
    console.log(this.countryCode);
    this.I = this.countryCode.toString();

  } */

}
