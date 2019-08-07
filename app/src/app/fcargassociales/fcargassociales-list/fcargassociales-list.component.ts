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
import { EmpresaService } from 'src/app/empresa/empresa.service';

@Component({
  selector: 'app-fcargassociales-list',
  templateUrl: './fcargassociales-list.component.html',
  styleUrls: ['./fcargassociales-list.component.css']
})
export class FcargassocialesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Importe'];
  dataSource: MatTableDataSource<Fcargassociales> = new MatTableDataSource<Fcargassociales>();
  //data: FcargassocialessApi;

  periodo: any;
  fechahasta: Date;
  fechadesde: Date;
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
    public printService: PrintService,
    private empresaService: EmpresaService,
  ) {
    if(localStorage.getItem('fcargassociales-periodo')) {
      this.periodo = localStorage.getItem('fcargassociales-periodo');
    } else {
      this.periodo = formatDate(Date.now(), "yyyy-MM", 'en-US');
    }
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    this.updateGrilla();
  }
  
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }
  
  changePeriodo(event) {
    this.periodo = event.target.value;
    localStorage.setItem("fcargassociales-periodo", this.periodo);
    this.updateGrilla();
  }

  setFechasFromPeriodo() {
    const anio = parseInt(this.periodo.split("-")[0]);
    const mes = parseInt(this.periodo.split("-")[1]);

    this.fechadesde = new Date(anio, mes - 1, 1);
    this.fechahasta = new Date(anio, mes, 0);
  }

  async updateGrilla() {
    this.setFechasFromPeriodo();
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
    if(!this.importedetraccion) {
      const notificacion = {
        codigo: 400,
        mensaje: "Debe ingresar un importe a detraer."
      }
      const ret = this.notificationService.notify(notificacion);
      return ret;
    }

    const empresa = await this.empresaService.getEmpresa();
    const fcargassocialessTXT: any = await this.fcargassocialesService.getFcargassocialesTXT(this.fechadesde,this.fechahasta, this.importedetraccion);
    var blob = new Blob([fcargassocialessTXT.data], {type: "text/plain;charset=utf-8"});
    
    const anio = parseInt(this.periodo.split("-")[0]);
    const mes = parseInt(this.periodo.split("-")[1]);
    const nombreArchivo = `${empresa.cuit}_${anio}-${mes}_0_`;
    saveAs.saveAs(blob, nombreArchivo);
  }

  refreshTableSorce() {

  }

}