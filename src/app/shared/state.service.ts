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
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  stateList: AngularFireList<any>;

  form: FormGroup = new FormGroup({ 
    $key: new FormControl(null),
    stateName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 _-]{2,24}$')]),
    countryName: new FormControl('',Validators.required),
    stateCode: new FormControl('',[Validators.required,Validators.max(3),Validators.pattern('^[a-zA-Z0-9 ]{1,3}$')]),
    isActive: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      stateName: '',
      countryName: '',
      stateCode: '',
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
      stateCode: state.stateCode, 
      isActive: state.isActive
    });
  }

  updateState(state) {
    this.stateList.update(state.$key,
      {
        stateName: state.stateName, 
        countryName: state.countryName,
        stateCode: state.stateCode,
        isActive: state.isActive
      });
  }

  deleteState($key: string) {
    this.stateList.remove($key);
  }

  populateForm(state) {
    this.form.setValue(state);
  }
}
