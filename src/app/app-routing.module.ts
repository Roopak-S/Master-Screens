import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateListComponent } from './StateMaster/state-list/state-list.component';
import { CountryListComponent } from './CountryMaster/country-list/country-list.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';


const routes: Routes = [
  { path: 'state', component: StateListComponent },
  { path: 'country', component: CountryListComponent },
  { path: 'language', component: LanguageSelectorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
