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

@Component({
  selector: 'app-liquidacion-list',
  templateUrl: './liquidacion-list.component.html',
  styleUrls: ['./liquidacion-list.component.css']
})
export class LiquidacionListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Seleccionar', 'Legajo', 'Apellido', 'Nombre', 'Fecha Liquidacion', 'Periodo Liquidacion', 'Tipo',  'Contabilizada', 'Acciones' ];
  dataSource: MatTableDataSource<Liquidacion> = new MatTableDataSource<Liquidacion>();
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
      this.dataSource = new MatTableDataSource<Liquidacion>(liquidacionesApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;

  }
  
  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  async onClickContabilizar(datos) {
   var elementsRequest = [];
   datos.forEach(function (el, index) {
      if (el.checked == true) { elementsRequest.push(el.ID)};
    }, this);    
    const responseContabilizarLiq: any = await this.liquidacionService.postContabilizarLiquidacion(elementsRequest);
    this.notificationService.notify(responseContabilizarLiq);
  }

  onCreate(item: Liquidacion) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Liquidacion>(this.dataSource.data);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(item: Liquidacion) {
    console.log("Updated Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    }, this);

    this.dataSource = new MatTableDataSource<Liquidacion>(this.dataSource.data);
  }

  onDelete(item: Liquidacion) {
    console.log("Deleted Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1);
    }, this);

    this.dataSource = new MatTableDataSource<Liquidacion>(this.dataSource.data);
  }

  refreshTableSorce() {

  }

  obtenerTipoLiquidacion(row: Liquidacion) {
    let tipo: string;
    switch (row.tipo) {
      case 1:
        tipo = 'Mensual';
        break;
      case 2:
        tipo = 'Primer Quincena';
        break;
      case 3:
        tipo = 'Segunda Quincena';
        break;
      case 4:
        tipo = 'Vacaciones';
        break;
      case 5:
        tipo = 'SAC';
        break;
      case 6:
        tipo = 'Liquidación Final';
        break;
      default:
        tipo = '-';
        break;
    }

    return tipo;
  }

  calcularTotal(row: Liquidacion) {
    return 'Falta calcular';
  }
}

