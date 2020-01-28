import { MatDialog } from '@angular/material/dialog';
import { LegajoService } from './../../../legajo/legajo.service';
import { ListaItems } from './../../../fcargassociales/fcargassociales.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Legajo } from 'src/app/legajo/legajo.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.container.html',
  styleUrls: ['./formulas.container.scss']
})
export class FormulasContainer implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [ 'Legajo' , 'Apellido',  'Nombre', 'Acciones'];
  dataSource: MatTableDataSource<Legajo> = new MatTableDataSource<Legajo>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  legajoID$: Observable<string>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;

  constructor(
    private legajoService: LegajoService,
    public dialog: MatDialog,
    // public printService : PrintService
  ) { }

  ngOnInit() {
  }

  public filterResults(payload: string) {
    console.log(payload);
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
