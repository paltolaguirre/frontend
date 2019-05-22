import { ListaItems, ConceptoService } from '../concepto.service';
import { Concepto } from '../concepto.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-concepto-list',
  templateUrl: './concepto-list.component.html',
  styleUrls: ['./concepto-list.component.css']
})
export class ConceptoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ID', 'Creado', 'Nombre' , 'Acciones'];
  dataSource: MatTableDataSource<Concepto> = new MatTableDataSource<Concepto>();
  //data: ConceptosApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  conceptoID$: Observable<String>;
  public currentConcepto$: Observable<Concepto> = null;
  id: number;


  constructor(
    private route: ActivatedRoute,
    private conceptoService: ConceptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {

      const conceptosApi: ListaItems = await this.conceptoService.getConceptos(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Concepto>(conceptosApi.items);
      this.isLoadingResults = false;

  }

  onCreate(item: Concepto) {
    console.log("Created Item: " + item.ID);
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Concepto>(this.dataSource.data);
  }

  onUpdate(item: Concepto) {
    console.log("Updated Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    }, this);

    this.dataSource = new MatTableDataSource<Concepto>(this.dataSource.data);
  }

  onDelete(item: Concepto) {
    console.log("Deleted Item: " + item.ID);
    this.dataSource.data.forEach(function (el, index) {
      if (el.ID == item.ID) this.dataSource.data.splice(index, 1);
    }, this);

    this.dataSource = new MatTableDataSource<Concepto>(this.dataSource.data);
  }

  refreshTableSorce() {

  }
}