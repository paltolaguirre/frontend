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
import { DialogLiquidacionesList } from './liquidacion-list-dialog/liquidacion-list-dialog.component';

@Component({
  selector: 'app-liquidacion-list',
  templateUrl: './liquidacion-list.component.html',
  styleUrls: ['./liquidacion-list.component.css']
})
export class LiquidacionListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Creado', 'Nombre' , 'Acciones' ];
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

  }

  async ngAfterViewInit() {

      const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidaciones(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Liquidacion>(liquidacionesApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;

  }
  
  
  onClickContabilizar(data): void {
    const dialogRef = this.dialog.open(DialogLiquidacionesList, {
       data
    });

    dialogRef.afterClosed().subscribe(result => {
   
    });
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
}

