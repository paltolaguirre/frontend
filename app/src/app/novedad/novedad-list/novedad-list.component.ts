import { ListaItems, NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of as observableOf } from 'rxjs';
import { PrintService } from 'src/app/print/print.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-novedad-list',
  templateUrl: './novedad-list.component.html',
  styleUrls: ['./novedad-list.component.css']
})
export class NovedadListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo','Apellido','Nombre','Concepto', 'Fecha' , 'Acciones'];
  dataSource: MatTableDataSource<Novedad> = new MatTableDataSource<Novedad>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  novedadID$: Observable<String>;
  public currentNovedad$: Observable<Novedad> = null;
  id: number;


  constructor(
    private novedadService: NovedadService,
    public dialog: MatDialog,
    public printService: PrintService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.loadingService.show();

    const novedadesApi: ListaItems = await this.novedadService.getNovedades(this.sort.active, this.sort.direction, 1);
    this.dataSource = new MatTableDataSource<Novedad>(novedadesApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";

    this.loadingService.hide();
  }

  onCreate(item: Novedad) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Novedad>(this.dataSource.data);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
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
}
