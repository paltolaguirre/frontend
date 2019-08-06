import { ListaItems, FcargassocialesService } from '../fcargassociales.service';
import { Fcargassociales } from '../fcargassociales.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-fcargassociales-list',
  templateUrl: './fcargassociales-list.component.html',
  styleUrls: ['./fcargassociales-list.component.css']
})
export class FcargassocialesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Importe'];
  dataSource: MatTableDataSource<Fcargassociales> = new MatTableDataSource<Fcargassociales>();
  //data: FcargassocialessApi;

  fechahasta : any;
  fechadesde : any;
  importedetraccion: any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  fcargassocialesID$: Observable<String>;
  public currentFcargassociales$: Observable<Fcargassociales> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private fcargassocialesService: FcargassocialesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) {
    if(localStorage.getItem('fcargassociales-fechahasta')) {
      this.fechahasta = localStorage.getItem('fcargassociales-fechahasta');
    } else {
      this.fechahasta = formatDate(Date.now(), "MM-dd-yyyy", 'en-US');
    }
    if(localStorage.getItem('fcargassociales-fechadesde')) {
      this.fechadesde = localStorage.getItem('fcargassociales-fechadesde');
    } else {
      this.fechadesde = '01-01-2000';
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
    localStorage.setItem("fcargassociales-fechadesde",value);
    this.fechadesde = value;
    this.updateGrilla();
  }
  changeFechaHasta (value) {
    localStorage.setItem("fcargassociales-fechahasta",value);
    this.fechahasta = value;
    this.updateGrilla();

  }


  async ngAfterViewInit() {
    this.updateGrilla ();
  }

  async updateGrilla () {
    const fcargassocialessApi: ListaItems = await this.fcargassocialesService.getFcargassocialess(this.sort.active, this.sort.direction,this.fechadesde,this.fechahasta, 1);
    this.dataSource = new MatTableDataSource<Fcargassociales>(fcargassocialessApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
    this.isLoadingResults = false;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  async exportarTXT() {
    const fcargassocialessTXT: any = await this.fcargassocialesService.getFcargassocialesTXT(this.fechadesde,this.fechahasta, this.importedetraccion);
    var blob = new Blob([fcargassocialessTXT.data], {type: "text/plain;charset=utf-8"});
    saveAs.saveAs(blob, 'F931EXPORT');
  }

  refreshTableSorce() {

  }

}