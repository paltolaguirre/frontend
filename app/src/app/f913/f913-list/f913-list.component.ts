import { ListaItems, F913Service } from '../f913.service';
import { F913 } from '../f913.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-f913-list',
  templateUrl: './f913-list.component.html',
  styleUrls: ['./f913-list.component.css']
})
export class F913ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Importe'];
  dataSource: MatTableDataSource<F913> = new MatTableDataSource<F913>();
  //data: F913sApi;

  fechahasta : any;
  fechadesde : any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  f913ID$: Observable<String>;
  public currentF913$: Observable<F913> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private f913Service: F913Service,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) { 
    if(localStorage.getItem('f913-fechahasta')) {
      this.fechahasta = localStorage.getItem('f913-fechahasta');
    }
    if(localStorage.getItem('f913-fechadesde')) {
      this.fechadesde = localStorage.getItem('f913-fechadesde');
    }  
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {
      const f913sApi: ListaItems = await this.f913Service.getF913s(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<F913>(f913sApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  refreshTableSorce() {

  }

}