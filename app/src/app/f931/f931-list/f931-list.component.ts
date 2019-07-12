import { ListaItems, F931Service } from '../f931.service';
import { F931 } from '../f931.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-f931-list',
  templateUrl: './f931-list.component.html',
  styleUrls: ['./f931-list.component.css']
})
export class F931ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Fechaperiodoliquidacion' , 'Concepto', 'Importe'];
  dataSource: MatTableDataSource<F931> = new MatTableDataSource<F931>();
  //data: F931sApi;

  fechahasta : any;
  fechadesde : any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  f931ID$: Observable<String>;
  public currentF931$: Observable<F931> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private f931Service: F931Service,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) {
    if(localStorage.getItem('f931-fechahasta')) {
      this.fechahasta = localStorage.getItem('f931-fechahasta');
    } else {
      this.fechahasta = formatDate(Date.now(), "MM-dd-yyyy", 'en-US');
    }
    if(localStorage.getItem('f931-fechadesde')) {
      this.fechadesde = localStorage.getItem('f931-fechadesde');
    } else {
      this.fechadesde = '01/01/2000';
    }
  }

  ngOnInit() {

  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }
  changeFechaDesde (value) {
    localStorage.setItem("f931-fechadesde",value);
    this.fechadesde = value;
    this.updateGrilla();
  }
  changeFechaHasta (value) {
    localStorage.setItem("f931-fechahasta",value);
    this.fechahasta = value;
    this.updateGrilla();

  }


  async ngAfterViewInit() {
    this.updateGrilla ();
  }

  async updateGrilla () {
    const f931sApi: ListaItems = await this.f931Service.getF931s(this.sort.active, this.sort.direction,this.fechadesde,this.fechahasta, 1);
    this.dataSource = new MatTableDataSource<F931>(f931sApi.items);
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