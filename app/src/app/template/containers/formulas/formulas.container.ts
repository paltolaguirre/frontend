import { MatDialog } from '@angular/material/dialog';
import { LegajoService } from './../../../legajo/legajo.service';
import { ListaItems } from './../../../fcargassociales/fcargassociales.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Legajo } from 'src/app/legajo/legajo.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.container.html',
  styleUrls: ['./formulas.container.scss']
})
export class FormulasContainer implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['Legajo', 'Apellido', 'Nombre', 'Acciones'];
  dataSource: MatTableDataSource<Legajo> = new MatTableDataSource<Legajo>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  legajoID$: Observable<string>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;

  constructor(
    private legajoService: LegajoService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public filterResults(payload: string) {
    this.dataSource.filter = payload.trim().toLocaleLowerCase();
  }

  async ngAfterViewInit() {
    const legajosApi: ListaItems = await this.legajoService.getLegajos(this.sort.active, this.sort.direction, 1);
    this.dataSource = new MatTableDataSource<Legajo>(legajosApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.isLoadingResults = false;

  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 20) {
      return [5, 10, 20, this.dataSource.paginator.length];
    }

    return [5, 10, 20];
  }

  onCreate(item: Legajo) {
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);
  }

  onUpdate(item: Legajo) {
    // this.dataSource.data.forEach((el, index) => {
    //   if (el.ID == item.ID) this.dataSource.data.splice(index, 1, item);
    // });

    // this.dataSource = new MatTableDataSource<Legajo>(this.dataSource.data);

    // /////
    const data = [...this.dataSource.data];

    const index = data.findIndex((element) => {
      return element.ID === item.ID;
    });

    data.splice(index, 1, item);

    this.dataSource = new MatTableDataSource<Legajo>(data);
  }

  onDelete(item: Legajo) {
    const data = this.dataSource.data.filter((file) => {
      return file.ID !== item.ID;
    });

    this.dataSource = new MatTableDataSource<Legajo>(data);
  }
}