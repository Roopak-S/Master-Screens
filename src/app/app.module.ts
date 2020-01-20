import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module'; 
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { StateComponent } from './StateMaster/state/state.component';
import { StateListComponent } from './StateMaster/state-list/state-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { StateService } from './shared/state.service';
import { CountryService } from './shared/country.service';
import { CountryListComponent } from './CountryMaster/country-list/country-list.component';
import { CountryComponent } from './CountryMaster/country/country.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';


@NgModule({  
  declarations: [
    AppComponent,
    StateComponent,
    StateListComponent,
    MatConfirmDialogComponent,
    CountryListComponent,
    CountryComponent,
    LanguageSelectorComponent

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [StateService,CountryService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[StateComponent,CountryComponent,MatConfirmDialogComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
