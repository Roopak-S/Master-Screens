import { StateComponent } from './../state/state.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../../shared/state.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CountryService } from '../../shared/country.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';


@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {

  constructor(private service: StateService,
    private countryService: CountryService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['stateName', 'countryName','countryID','isActive'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;

  selectedRowKey: any = -1;
  selectedRow : any;

  ngOnInit() {
    this.service.getStates().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }; 
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
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
    this.dialog.open(StateComponent,dialogConfig);
  }

  onEdit(){
    let row = this.selectedRow;
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StateComponent,dialogConfig);
  }

  onDelete(){
    let $key = this.selectedRowKey;
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteState($key);
        this.notificationService.warn('Deleted Successfully');
      }
    });
  }
}