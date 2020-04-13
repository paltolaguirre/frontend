import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Formula } from 'src/app/core/models/formula.model';

@Component({
  selector: 'app-formula-list',
  templateUrl: './formula-list.container.html',
  styleUrls: ['./formula-list.container.scss']
})
export class FormulaListContainer implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['Nombre', 'Acciones'];
  dataSource: MatTableDataSource<Formula> = new MatTableDataSource<Formula>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  id: number;

  constructor(
    public dialog: MatDialog,
    private formulaService: FormulaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public async createFormula() {
    await this.router.navigate(['/formulas/create']);
  }

  public filterResults(payload: string) {
    this.dataSource.filter = payload.trim().toLocaleLowerCase();
  }

  async ngAfterViewInit() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.dataSource = new MatTableDataSource<Formula>(formulas.filter(formula => formula.type == 'generic'));
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.isLoadingResults = false;
    });
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

  public editFormula(item: Formula) {
    this.router.navigate(['/formulas/edit', item.name]);
  }

  public async onDelete(item: Formula) {
    await this.formulaService.delete(item.name);

    this.removeItemFromTable(item);
  }

  public removeItemFromTable(item: Formula) {
    const data = this.dataSource.data.filter((formula) => {
      return formula.name !== item.name;
    });

    this.dataSource = new MatTableDataSource<Formula>(data);
  }

  public isFormulaEditable(formula: Formula): boolean {
    return this.formulaService.isEditable(formula);
  }
}
