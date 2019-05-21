import { ListaItems, LegajoService } from '../legajo.service';
import { Legajo } from '../legajo.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-legajo-list',
  templateUrl: './legajo-list.component.html',
  styleUrls: ['./legajo-list.component.css']
})
export class LegajoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ID', 'Creado', 'Nombre', 'Legajo', 'Acciones'];
  dataSource: MatTableDataSource<Legajo> = new MatTableDataSource<Legajo>();
  //data: LegajosApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  legajoID$: Observable<String>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;


  constructor(
    private route: ActivatedRoute,
    private legajoService: LegajoService,
    public dialog: MatDialog,
    private notificationService: NotificationService
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
      this.isLoadingResults = false;

  }

  onCreate(item: Legajo) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);
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