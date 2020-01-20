import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
 
  url :string = "../assets/Region/region.json";
  array = [];
  a : number;

  constructor(private https:HttpClient) {
    this.allRegions().subscribe(
      data2 => {
        this.array=data2.Regions;
      }
     )
    }

  allRegions(): Observable<any>{
    return this.https.get(this.url);
    
  }


  getKey(value)
  {
    this.a = null;
    console.log("Get Key Entered and value is:"+value);
    this.a = _.findIndex(this.array, ['CountryName', value]);
    console.log("a"+this.a);
    return this.a;
  }

  /*
  countryList: AngularFireList<any>;
  array = [];
 
  constructor(private firebase: AngularFireDatabase) {
    this.countryList = this.firebase.list('Countries');
    this.countryList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }
*/

   getRegionName($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; });
    }
  }
/*
  setSelect(id)
  {
    this.selectedC = id;
    console.log(this.selectedC);
  }
*/
}
