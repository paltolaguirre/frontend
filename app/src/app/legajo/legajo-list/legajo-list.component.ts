import { ListaItems, LegajoService } from '../legajo.service';
import { Legajo } from '../legajo.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PrintService } from 'src/app/print/print.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-legajo-list',
  templateUrl: './legajo-list.component.html',
  styleUrls: ['./legajo-list.component.css']
})
export class LegajoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'Legajo' , 'Apellido',  'Nombre', 'Acciones'];
  dataSource: MatTableDataSource<Legajo> = new MatTableDataSource<Legajo>();

  resultsLength = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  legajoID$: Observable<String>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;


  constructor(
    private legajoService: LegajoService,
    public dialog: MatDialog,
    public printService: PrintService,
    private loadingService: LoadingService
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
    this.loadingService.show();

    const legajosApi: ListaItems = await this.legajoService.getLegajos(this.sort.active, this.sort.direction, 1);
    this.dataSource = new MatTableDataSource<Legajo>(legajosApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";

    this.loadingService.hide();
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
