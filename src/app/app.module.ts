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
import { StateComponent } from './states/state/state.component';
import { StateListComponent } from './states/state-list/state-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { StateService } from './shared/state.service';
import { CountryService } from './shared/country.service';


@NgModule({  
  declarations: [
    AppComponent,
    StateComponent,
    StateListComponent,
    MatConfirmDialogComponent

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
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [StateService,CountryService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[StateComponent,MatConfirmDialogComponent]
})
export class AppModule { }
