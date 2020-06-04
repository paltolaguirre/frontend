import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { PrintService } from 'src/app/print/print.service';
import { ListaItems } from 'src/app/concepto/concepto.service';
import { Siradig } from '../siradig.model';
import { SiradigService } from '../siradig.service';
import { DatePipe } from '@angular/common';
import { TableService } from 'src/app/shared/services/table.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

export interface SiradigTable {
  ID: number;
  item: Siradig;
  legajo: string;
  apellido: string;
  nombre: string;
  periodo: string;
}

@Component({
  selector: 'app-siradig-list',
  templateUrl: './siradig-list.component.html',
  styleUrls: ['./siradig-list.component.css']
})
export class SiradigListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'Legajo' , 'Apellido',  'Nombre', 'Periodo', 'Acciones'];
  dataSource: MatTableDataSource<SiradigTable> = new MatTableDataSource<SiradigTable>();
  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public currentItem$: Observable<Siradig> = null;
  id: number;

  constructor(
    private siradigService: SiradigService,
    public dialog: MatDialog,
    public printService : PrintService,
    private tableService: TableService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {
    this.loadingService.show();

    try {
      const itemsApi: ListaItems = await this.siradigService.getSiradigs();
      this.dataSource = this.tableService.getDataSource(itemsApi.items, this.parseSiradigToSiradigTable);
    } catch (error) {
      this.dataSource = new MatTableDataSource<SiradigTable>([]);
    }

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";

    this.loadingService.hide();
  }

  parseSiradigToSiradigTable(siradig: Siradig): SiradigTable {
    var datePipe = new DatePipe('es-Ar');
    const siradigTable: SiradigTable = {
      ID: siradig.ID,
      item: siradig,
      legajo: siradig.legajo.legajo,
      apellido: siradig.legajo.apellido,
      nombre: siradig.legajo.nombre,
      periodo: datePipe.transform(siradig.periodosiradig, 'yyyy'),
    };

    return siradigTable;
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  onCreate(siradig: Siradig) {
    console.log("Created Item: " + siradig.ID);

    const item = this.parseSiradigToSiradigTable(siradig);
    this.dataSource = this.tableService.addDataSource(this.dataSource, item);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(siradig: Siradig) {
    console.log("Updated Item: " + siradig.ID);
    const item: any = this.parseSiradigToSiradigTable(siradig);
    this.dataSource = this.tableService.updateDataSource(this.dataSource, item);
  }

  onDelete(siradig: Siradig) {
    console.log("Deleted Item: " + siradig.ID);
    this.dataSource = this.tableService.deleteDataSource(this.dataSource, siradig.ID);
  }

  refreshTableSorce() {

  }

  private isSelected(elemento) {
    return elemento.checked == true;
  }
}
