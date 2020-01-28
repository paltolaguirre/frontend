import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { PrintService } from 'src/app/print/print.service';
import { ListaItems } from 'src/app/concepto/concepto.service';
import { Siradig } from '../siradig.model';
import { SiradigService } from '../siradig.service';
import { DatePipe } from '@angular/common';
import { TableService } from 'src/app/shared/services/table.service';

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
  //data: LegajosApi;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public currentItem$: Observable<Siradig> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private siradigService: SiradigService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {

      //this.isLoadingResults = false;
      try {
        const itemsApi: ListaItems = await this.siradigService.getSiradigs();
        this.dataSource = this.tableService.getDataSource(itemsApi.items, this.parseSiradigToSiradigTable);
      } catch (error) {
        this.dataSource = new MatTableDataSource<SiradigTable>([]);
      }
      
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
      this.isLoadingResults = false; 
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