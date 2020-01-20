import { CountryComponent } from '../country/country.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../../shared/country.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  constructor(private service: CountryService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
     }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['regionName', 'countryName','countryID','isActive','Actions'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;

  selectedRowKey: any = -1;
  selectedRow : any;

  ngOnInit() {
    this.service.getCountries().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }; 
        });
        //console.log(array);
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'Actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  exit(formValue : any){
    return this.listData.data.find(formValue);
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  highlight(row){
    this.selectedRow = row;
    this.selectedRowKey = row.$key;
    console.log("selectedRowKey:" + this.selectedRowKey);
    console.log("row:" + row);
}

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CountryComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CountryComponent,dialogConfig);
  } 

  onDelete(event,$key){
    event.stopPropagation();
    this.dialogService.openConfirmDialog(this.translate.instant('dialog.deleteConfirm'))
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteCountry($key);
        this.notificationService.warn(this.translate.instant('notif.deleteSuccess'));
      }
    });
  }

}
