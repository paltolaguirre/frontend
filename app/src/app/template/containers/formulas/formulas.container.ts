import { Router } from '@angular/router';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { MatDialog } from '@angular/material/dialog';
import { LegajoService } from './../../../legajo/legajo.service';
import { ListaItems } from './../../../fcargassociales/fcargassociales.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Legajo } from 'src/app/legajo/legajo.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Formula } from 'src/app/core/models/formula.model';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.container.html',
  styleUrls: ['./formulas.container.scss']
})
export class FormulasContainer implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['Formula', 'Nombre', 'Descripcion', 'Acciones'];
  dataSource: MatTableDataSource<Formula> = new MatTableDataSource<Formula>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  legajoID$: Observable<string>;
  public currentLegajo$: Observable<Legajo> = null;
  id: number;

  constructor(
    private legajoService: LegajoService,
    public dialog: MatDialog,
    private formulaService: FormulaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public async createFormula() {
    await this.router.navigate(['/formulas/create']); // Test that.
  }

  public filterResults(payload: string) {
    this.dataSource.filter = payload.trim().toLocaleLowerCase();
  }

  async ngAfterViewInit() {
    // const legajosApi: ListaItems = await this.legajoService.getLegajos(this.sort.active, this.sort.direction, 1);
    // this.dataSource = new MatTableDataSource<Legajo>(legajosApi.items);
    // this.dataSource.paginator = this.paginator;
    // this.paginator._intl.itemsPerPageLabel = 'Items por página';
    // this.isLoadingResults = false;
    const formulas = await this.formulaService.getAll();
    this.dataSource = new MatTableDataSource<Formula>(formulas);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.isLoadingResults = false;
  }

  public getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 20) {
      return [5, 10, 20, this.dataSource.paginator.length];
    }

    return [5, 10, 20];
  }

  public onCreate(item: Formula) {
    this.dataSource.data.push(item);

    this.dataSource = new MatTableDataSource<Formula>(this.dataSource.data);
  }

  public editFormula(item: Legajo) {
    console.log(item);

    // this.router.navigate(['/legajos', this.legajo]);
  }

  // TODO: Remove if it is not being used.
  public onUpdate(event, item: Formula) {
    const data = [...this.dataSource.data];

    const index = data.findIndex((element) => {
      return element.id === item.id;
    });

    data.splice(index, 1, item);

    this.dataSource = new MatTableDataSource<Formula>(data);
  }

  public async onDelete(item: Formula) {
    try {
      await this.formulaService.delete(item);

      this.removeItemFromTable(item);
    } catch (e) {
      console.log(e);
      // TODO: Use error logging tool.
    }
  }

  private removeItemFromTable(item: Formula) {
    const data = this.dataSource.data.filter((file) => {
      return file.id !== item.id;
    });

    this.dataSource = new MatTableDataSource<Formula>(data);
  }
}
