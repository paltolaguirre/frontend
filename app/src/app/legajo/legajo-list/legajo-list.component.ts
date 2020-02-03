import { ListaItems, LegajoService } from '../legajo.service';
import { Legajo } from '../legajo.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-legajo-list',
  templateUrl: './legajo-list.component.html',
  styleUrls: ['./legajo-list.component.css']
})
export class LegajoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'Legajo' , 'Apellido',  'Nombre', 'Acciones'];
  dataSource: MatTableDataSource<Legajo> = new MatTableDataSource<Legajo>();
  //data: LegajosApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  legajoID$: Observable<String>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;


  constructor(
    private route: ActivatedRoute,
    private legajoService: LegajoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) { }

  ngOnInit() {
    /*this.currentLegajo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = +params.get('id');
        console.log('Url ID: ' + this.id);
        return this.legajoService.getLegajo(this.id);
      })
    );*/
  }

  async ngAfterViewInit() {

      //this.isLoadingResults = false;
      const legajosApi: ListaItems = await this.legajoService.getLegajos(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Legajo>(legajosApi.items);
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

  onCreate(item: Legajo) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(item: Legajo) {
    console.log("Updated Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    }, this);

    this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);
  }

  onDelete(item: Legajo) {
    console.log("Deleted Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1);
    }, this);

    this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);
  }

  refreshTableSorce() {

  }
}