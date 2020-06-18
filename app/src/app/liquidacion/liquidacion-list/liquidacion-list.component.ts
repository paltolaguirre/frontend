import { ListaItems, LiquidacionService } from '../liquidacion.service';
import { Liquidacion } from '../liquidacion.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { PrintService } from 'src/app/print/print.service';
import { DuplicarDialogComponent } from './duplicar-dialog/duplicar-dialog.component';
import { ContabilizarDialogComponent } from './contabilizar-dialog/contabilizar-dialog.component';
import { DatePipe, formatDate } from '@angular/common';
import { TableService } from 'src/app/shared/services/table.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { SelectionModel } from '@angular/cdk/collections';

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

  resultsLength = 0;
  isRateLimitReached = false;
  disabled = false;
  periodoliquidacionhasta : any;
  periodoliquidaciondesde : any;
  liquidaciontipo : any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  liquidacionID$: Observable<String>;

  public currentLiquidacion$: Observable<Liquidacion> = null;
  id: number;
  selection: SelectionModel<LiquidacionTable>;

  constructor(
    private liquidacionService: LiquidacionService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService: PrintService,
    private tableService: TableService,
    private loadingService: LoadingService
  ) {
    if(localStorage.getItem('liquidacion-list-fechaliquidacionhasta')) {
      this.periodoliquidacionhasta = localStorage.getItem('liquidacion-list-fechaliquidacionhasta');
    } else {
      this.periodoliquidacionhasta = formatDate(Date.now(), "yyyy-MM", 'en-US');
    }
    if(localStorage.getItem('liquidacion-list-fechaliquidaciondesde')) {
      this.periodoliquidaciondesde = localStorage.getItem('liquidacion-list-fechaliquidaciondesde');
    } else {
      this.periodoliquidaciondesde = '2000-01';
    }
    this.liquidaciontipo = 0;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<LiquidacionTable>(allowMultiSelect, initialSelection);
  }

  async ngAfterViewInit() {
    this.updateGrilla();
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

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  onClickContabilizar(data: LiquidacionTable[]): void {
    data = this.selection.selected

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
      });
    }
  }

  onCreate(liquidacion: Liquidacion) {
    console.log("Created Item: " + liquidacion.ID);

    const item = this.parseLiquidacionToLiquidacionTable(liquidacion);
    this.dataSource = this.tableService.addDataSource(this.dataSource, item);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(liquidacion: Liquidacion) {
    console.log("Updated Item: " + liquidacion.ID);
    const item: any = this.parseLiquidacionToLiquidacionTable(liquidacion);
    this.dataSource = this.tableService.updateDataSource(this.dataSource, item);
  }

  onDelete(liquidacion: Liquidacion) {
    console.log("Deleted Item: " + liquidacion.ID);
    this.dataSource = this.tableService.deleteDataSource(this.dataSource, liquidacion.ID);
  }

  calcularTotal(row: Liquidacion) {
    return 'Falta calcular';
  }

  onClickDuplicar(data): void {
    data = this.selection.selected

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
      });
    }
  }

  changePeriodoLiquidacionDesde (value) {
    localStorage.setItem("liquidacion-list-fechaliquidaciondesde",value);
    this.periodoliquidaciondesde = value;
    this.updateGrilla();
  }
  changePeriodoLiquidacionHasta (value) {
    localStorage.setItem("liquidacion-list-fechaliquidacionhasta",value);
    this.periodoliquidacionhasta = value;
    this.updateGrilla();
  }

  async updateGrilla () {
    this.loadingService.show();

    this.selection.clear()
    const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidacionesPorPeriodo(this.sort.active, this.sort.direction, 1,this.periodoliquidaciondesde,this.periodoliquidacionhasta, this.liquidaciontipo);
    this.dataSource = this.tableService.getDataSource(liquidacionesApi.items, this.parseLiquidacionToLiquidacionTable);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";

    this.loadingService.hide();
  }

  changeTipoLiquidacion (value) {
    localStorage.setItem("liquidacion-list-liquidaciontipo",value);
    this.liquidaciontipo = value;
    this.updateGrilla();
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

}

