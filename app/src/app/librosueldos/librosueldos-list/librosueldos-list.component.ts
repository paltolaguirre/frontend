import { ListaItems, LibrosueldosService } from '../librosueldos.service';
import { Librosueldos } from '../librosueldos.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-librosueldos-list',
  templateUrl: './librosueldos-list.component.html',
  styleUrls: ['./librosueldos-list.component.css']
})
export class LibrosueldosListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Fechaperiodoliquidacion' , 'Concepto', 'Importe'];
  dataSource: MatTableDataSource<Librosueldos> = new MatTableDataSource<Librosueldos>();
  //data: LibrosueldossApi;

  fechahasta : any;
  fechadesde : any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  librosueldosID$: Observable<String>;
  public currentLibrosueldos$: Observable<Librosueldos> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private librosueldosService: LibrosueldosService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService : PrintService
  ) {
    if(localStorage.getItem('librosueldos-fechahasta')) {
      this.fechahasta = localStorage.getItem('librosueldos-fechahasta');
    } else {
      this.fechahasta = formatDate(Date.now(), "MM-dd-yyyy", 'en-US');
    }
    if(localStorage.getItem('librosueldos-fechadesde')) {
      this.fechadesde = localStorage.getItem('librosueldos-fechadesde');
    } else {
      this.fechadesde = '01-01-2000';
    }
  }

  ngOnInit() {

  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }
  changeFechaDesde (value) {
    localStorage.setItem("librosueldos-fechadesde",value);
    this.fechadesde = value;
    this.updateGrilla();
  }
  changeFechaHasta (value) {
    localStorage.setItem("librosueldos-fechahasta",value);
    this.fechahasta = value;
    this.updateGrilla();
  }

  async ngAfterViewInit() {
    this.updateGrilla ();
  }

  async updateGrilla () {
    const librosueldossApi: ListaItems = await this.librosueldosService.getLibrosueldos(this.sort.active, this.sort.direction,this.fechadesde,this.fechahasta, 1);
    this.dataSource = new MatTableDataSource<Librosueldos>(librosueldossApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
    this.isLoadingResults = false;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  refreshTableSorce() {

  }

  private gotoPreview() {
    this.router.navigate([`/informes/libro-sueldos/imprimir`]);
  }

  onClickPreview(): void {
    this.gotoPreview();
  }
}