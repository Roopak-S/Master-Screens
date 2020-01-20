import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { DialogService } from '../shared/dialog.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {


  constructor(private translate: TranslateService,
    private dialogService: DialogService,
    private fb: FormBuilder) {
    translate.setDefaultLang('en');
   }
 
  ngOnInit() {
  
    
  }

  langControl = new FormControl('',Validators.required);

  useLanguage(language: string) {
    if(language == ''||language == null)
    {
      return
    }
    this.dialogService.openConfirmDialog(this.translate.instant('lang.confirm'))
    .afterClosed().subscribe(res =>{
      if(res){
        this.translate.use(language);
      }
    });
}
}

