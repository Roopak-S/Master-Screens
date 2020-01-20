import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from './shared/dialog.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService,
    private dialogService: DialogService){
    translate.setDefaultLang('en');
  }
  title = 'State-Master-Final';
  isMenuOpen = true;
  contentMargin = 240;

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    } 
  }

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
