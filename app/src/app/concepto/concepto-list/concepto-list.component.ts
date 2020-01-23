import { ListaItems, ConceptoService } from '../concepto.service';
import { Concepto } from '../concepto.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-concepto-list',
  templateUrl: './concepto-list.component.html',
  styleUrls: ['./concepto-list.component.css']
})
export class ConceptoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nombre' , 'Acciones'];
  dataSource: MatTableDataSource<Concepto> = new MatTableDataSource<Concepto>();
  //data: ConceptosApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  conceptoID$: Observable<String>;
  public currentConcepto$: Observable<Concepto> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private conceptoService: ConceptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {

      const conceptosApi: ListaItems = await this.conceptoService.getConceptos(this.sort.active, this.sort.direction, 1);
      this.dataSource = new MatTableDataSource<Concepto>(conceptosApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false;

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.data.length];
    else
    return [5, 10, 20];
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