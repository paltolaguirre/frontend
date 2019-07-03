import { ListaItems, NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-novedad-list',
  templateUrl: './novedad-list.component.html',
  styleUrls: ['./novedad-list.component.css']
})
export class NovedadListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo','Concepto', 'Fecha' , 'Acciones'];
  dataSource: MatTableDataSource<Novedad> = new MatTableDataSource<Novedad>();
  //data: NovedadesApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  novedadID$: Observable<String>;
  public currentNovedad$: Observable<Novedad> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private novedadService: NovedadService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {

      const novedadesApi: ListaItems = await this.novedadService.getNovedades(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Novedad>(novedadesApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;

  }
  

  onCreate(item: Novedad) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Novedad>(this.dataSource.data);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(item: Novedad) {
    console.log("Updated Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    }, this);

    this.dataSource = new MatTableDataSource<Novedad>(this.dataSource.data);
  }

  onDelete(item: Novedad) {
    console.log("Deleted Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1);
    }, this);

    this.dataSource = new MatTableDataSource<Novedad>(this.dataSource.data);
  }

  refreshTableSorce() {

  }
}