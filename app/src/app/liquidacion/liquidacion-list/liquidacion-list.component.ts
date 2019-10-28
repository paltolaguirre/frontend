import { ListaItems, LiquidacionService } from '../liquidacion.service';
import { Liquidacion } from '../liquidacion.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { DuplicarDialogComponent } from './duplicar-dialog/duplicar-dialog.component';
import { ContabilizarDialogComponent } from './contabilizar-dialog/contabilizar-dialog.component';
import { DatePipe } from '@angular/common';

export interface LiquidacionTable {
  ID: number;
  item: Liquidacion;
  legajo: string;
  apellido: string;
  nombre: string;
  fechaliquidacion: string;
  periodoliquidacion: string;
  tipo: string;
  contabilizada: string;
}

@Component({
  selector: 'app-liquidacion-list',
  templateUrl: './liquidacion-list.component.html',
  styleUrls: ['./liquidacion-list.component.css']
})
export class LiquidacionListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Seleccionar', 'Legajo', 'Apellido', 'Nombre', 'Fecha Liquidacion', 'Periodo Liquidacion', 'Tipo',  'Contabilizada', 'Acciones' ];
  dataSource: MatTableDataSource<LiquidacionTable> = new MatTableDataSource<LiquidacionTable>();
  //data: LiquidacionesApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  disabled = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  liquidacionID$: Observable<String>;
  public currentLiquidacion$: Observable<Liquidacion> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private liquidacionService: LiquidacionService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {

      const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidaciones(this.sort.active, this.sort.direction, 1);
      this.setDataSource(liquidacionesApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;

  }

  setDataSource(liquidaciones: Liquidacion[]) {
    const dataTable: LiquidacionTable[] = this.parseLiquidacionesToTable(liquidaciones);
    this.dataSource = new MatTableDataSource<LiquidacionTable>(dataTable);
  }

  addDataSource(liquidacion: Liquidacion) {
    const item = this.parseLiquidacionToLiquidacionTable(liquidacion);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<LiquidacionTable>(this.dataSource.data);
  }

  updateDataSource(liquidacion: Liquidacion) {
    const item = this.parseLiquidacionToLiquidacionTable(liquidacion);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    }, this);

    this.dataSource = new MatTableDataSource<LiquidacionTable>(this.dataSource.data);
  }

  deleteDataSource(liquidacion: Liquidacion) {
    //const item = this.parseLiquidacionToLiquidacionTable(liquidacion);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == liquidacion.ID) this.dataSource.data.splice(index, 1);
    }, this);

    this.dataSource = new MatTableDataSource<LiquidacionTable>(this.dataSource.data);
  }

  parseLiquidacionToLiquidacionTable(liquidacion: Liquidacion): LiquidacionTable {
    var datePipe = new DatePipe('es-Ar');
    const liquidacionTable: LiquidacionTable = {
      ID: liquidacion.ID,
      item: liquidacion,
      legajo: liquidacion.legajo.legajo,
      apellido: liquidacion.legajo.apellido,
      nombre: liquidacion.legajo.nombre,
      fechaliquidacion: datePipe.transform(liquidacion.fecha, 'd MMMM, yyyy'),
      periodoliquidacion: datePipe.transform(liquidacion.fechaperiodoliquidacion, 'MMMM yyyy'),
      tipo: liquidacion.tipo.nombre,
      contabilizada: liquidacion.estacontabilizada?'Si':'No',
    };

    return liquidacionTable;
  }

  parseLiquidacionesToTable(liquidaciones: Liquidacion[]): LiquidacionTable[] {
    const liquidacionesTable = [];
    liquidaciones.forEach(liquidacion => {
      const liquidacionTable: LiquidacionTable = this.parseLiquidacionToLiquidacionTable(liquidacion);
      liquidacionesTable.push(liquidacionTable);
    }, this);

    return liquidacionesTable;
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  onClickContabilizar(data: LiquidacionTable[]): void {
    data = data.filter(this.isSelected);

    if(data.length == 0) {
      const notificacion = {
        codigo: 400,
        mensaje: `Se debe seleccionar al menos una liquidación a contabilizar.`
      }
      const ret = this.notificationService.notify(notificacion);
    } else {
      const dialogRef = this.dialog.open(ContabilizarDialogComponent, {
        data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Respuesta PopUp: ", result);

        // TODO: no me convence llamar directamente a este metodo... investigar al respecto.
        this.ngAfterViewInit();

        /*if(result && result.refresh) {
          // TODO: no me convence llamar directamente a este metodo... investigar al respecto.
          this.ngAfterViewInit();
        }*/
      });
    }
  }

  /*async onClickContabilizar(datos) {
   var elementsRequest = [];
   datos.forEach(function (el, index) {
      if (el.checked == true) { elementsRequest.push(el.ID)};
    }, this);    
    const responseContabilizarLiq: any = await this.liquidacionService.postContabilizarLiquidacion(elementsRequest);
    this.notificationService.notify(responseContabilizarLiq);
  }*/

  onCreate(item: Liquidacion) {
    console.log("Created Item: " + item.ID);

    this.addDataSource(item);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(item: Liquidacion) {
    console.log("Updated Item: " + item.ID);
    this.updateDataSource(item);
  }

  onDelete(item: Liquidacion) {
    console.log("Deleted Item: " + item.ID);
    this.deleteDataSource(item);
  }

  refreshTableSorce() {

  }

  calcularTotal(row: Liquidacion) {
    return 'Falta calcular';
  }

  onClickDuplicar(data): void {
    data = data.filter(this.isSelected);

    if(data.length == 0) {
      const notificacion = {
        codigo: 400,
        mensaje: `Se debe seleccionar al menos una liquidación a duplicar.`
      }
      const ret = this.notificationService.notify(notificacion);
    } else {
      const dialogRef = this.dialog.open(DuplicarDialogComponent, {
        data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Respuesta PopUp: ", result);

        // TODO: no me convence llamar directamente a este metodo... investigar al respecto.
        this.ngAfterViewInit();

        /*if(result && result.refresh) {
          // TODO: no me convence llamar directamente a este metodo... investigar al respecto.
          this.ngAfterViewInit();
        }*/
      });
    }
  }

  private isSelected(elemento) {
    return elemento.checked == true;
  }
}

