import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import {CountryService} from './country.service';


@Injectable({
  providedIn: 'root'

})
export class StateService {
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe,private countryService:CountryService) { }

  stateList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    stateName: new FormControl('', Validators.required),
    countryName: new FormControl('',Validators.required),
    countryID: new FormControl('',Validators.required),
    isActive: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      stateName: '',
      countryName: '',
      countryID: '',
      isActive: false
    });
  }

  getStates() {
    this.stateList = this.firebase.list('states');
    return this.stateList.snapshotChanges();
  }

  insertState(state) {
    this.stateList.push({
      stateName: state.stateName,
      countryName: state.countryName, 
      countryID: state.countryID, 
      isActive: state.isActive
    });
  }

  updateState(state) {
    this.stateList.update(state.$key,
      {
        stateName: state.stateName, 
        countryName: state.countryName,
        countryID: state.countryID,
        isActive: state.isActive
      });
  }

  deleteState($key: string) {
    this.stateList.remove($key);
  }

  populateForm(state) {
    this.form.setValue(state);
    //this.form.controls.countryName.setValue(this.countryService.getCountryName(this.countryService.getKey(state.countryName)));
    //this.stateComponent.setSelect();
  }
}
