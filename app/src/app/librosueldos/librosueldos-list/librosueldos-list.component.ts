import { ListaItems, LibrosueldosService } from '../librosueldos.service';
import { Librosueldos } from '../librosueldos.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';
import { DialogEncabezado } from './encabezado-dialog/encabezado-dialog.component';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-librosueldos-list',
  templateUrl: './librosueldos-list.component.html',
  styleUrls: ['./librosueldos-list.component.css']
})
export class LibrosueldosListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Apellido', 'Nombre', 'Fechaperiodoliquidacion'];
  dataSource: MatTableDataSource<Librosueldos> = new MatTableDataSource<Librosueldos>();
  fechahasta : any;
  fechadesde : any;

  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  librosueldosID$: Observable<String>;
  public currentLibrosueldos$: Observable<Librosueldos> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private librosueldosService: LibrosueldosService,
    public dialog: MatDialog,
    public printService: PrintService,
    private loadingService: LoadingService
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

  ngOnInit() {}

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
    this.loadingService.show();

    const librosueldossApi: ListaItems = await this.librosueldosService.getLibrosueldos(this.sort.active, this.sort.direction,this.fechadesde,this.fechahasta, 1);
    this.dataSource = new MatTableDataSource<Librosueldos>(librosueldossApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";

    this.loadingService.hide();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  refreshTableSorce() {

  }

  private gotoPreview() {
    this.router.navigate([`/informes/libro-sueldos/imprimir`], { queryParams: { fechadesde: this.fechadesde, fechahasta: this.fechahasta }});
  }

  onClickPreview(): void {
    this.gotoPreview();
  }

  onClickEncabezado(): void {
    const dialogRef = this.dialog.open(DialogEncabezado, {

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
