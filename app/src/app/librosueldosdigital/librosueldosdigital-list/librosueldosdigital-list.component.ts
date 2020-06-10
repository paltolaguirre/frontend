import { ListaItems, LibrosueldosdigitalService } from '../librosueldosdigital.service';
import { Librosueldosdigital } from '../librosueldosdigital.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of as observableOf } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';
import { saveAs } from 'file-saver';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
    selector: 'app-librosueldosdigital-list',
    templateUrl: './librosueldosdigital-list.component.html',
    styleUrls: ['./librosueldosdigital-list.component.css']
})

export class LibrosueldosdigitalListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Apellido', 'Nombre', 'Periodo Liquidacion'];
  dataSource: MatTableDataSource<Librosueldosdigital> = new MatTableDataSource<Librosueldosdigital>();
  public defaultDate$: Observable<Date>;

  fechaperiodoliquidacion: any;
  periodoliquidacion: any;
  tipoliquidacion: any;
  importedetraccion: any;

  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  librosueldosdigitalID$: Observable<String>;
  public currentLibrosueldosdigital$: Observable<Librosueldosdigital> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private librosueldosdigitalService: LibrosueldosdigitalService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService: PrintService,
    private empresaService: EmpresaService,
    private loadingService: LoadingService
  ) {

    this.importedetraccion = "";
    this.tipoliquidacion = {nombre: "Mensual", codigo: "MENSUAL", ID: 1};
    if(localStorage.getItem('librosueldosdigital-periodo')) {
      this.fechaperiodoliquidacion = localStorage.getItem('librosueldosdigital-periodo');
    } else {
      this.fechaperiodoliquidacion = formatDate(Date.now(), "yyyy-MM", 'en-US');
    }
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    this.updateGrilla();
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length>20)
    return [5, 10, 20,  this.dataSource.paginator.length];
    else
    return [5, 10, 20];
  }

  changePeriodo(event) {
    this.fechaperiodoliquidacion = event.target.value;
    localStorage.setItem("librosueldosdigital-periodo", this.fechaperiodoliquidacion);
    this.updateGrilla();
  }

  changeTipoLiquidacion(event){
    this.tipoliquidacion = event
    this.updateGrilla();

  }

  async updateGrilla() {
    this.loadingService.show();

    if (this.canRequest()){
      const librosueldosdigitalApi: ListaItems = await this.librosueldosdigitalService.getLibrosueldosdigital(this.sort.active, this.sort.direction,this.tipoliquidacion.codigo,formatDate(this.fechaperiodoliquidacion+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US'),1);
      this.dataSource = new MatTableDataSource<Librosueldosdigital>(librosueldosdigitalApi.items);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Items por página";
    }

    this.loadingService.hide();
  }

  async exportarTXTConceptosAFIP() {

    const librosueldosdigitalconceptosafipTXT: any = await this.librosueldosdigitalService.getLibrosueldosdigitalTXTConceptosAFIP();
    var blob = new Blob([librosueldosdigitalconceptosafipTXT.data], {type: "text/plain;charset=utf-8"});
    const empresa = await this.empresaService.getEmpresa();
    const cuitempresa = empresa.cuit.replace("-","").replace("-","");
    const nombreArchivo = `${cuitempresa}-Concepto`;
    saveAs.saveAs(blob, nombreArchivo);
  }

  async exportarTXTLiquidacionesPeriodo() {
    if(!this.importedetraccion) {
      const notificacion = {
        codigo: 400,
        mensaje: "Debe ingresar un importe a detraer."
      }
      const ret = this.notificationService.notify(notificacion);
      return ret;
    }

    const librosueldosdigitalliquidacionesperiodoTXT: any = await this.librosueldosdigitalService.getLibrosueldosdigitalTXTLiquidacionesPeriodo(this.tipoliquidacion.codigo,formatDate(this.fechaperiodoliquidacion+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US'), this.importedetraccion);
    var blob = new Blob([librosueldosdigitalliquidacionesperiodoTXT.data], {type: "text/plain;charset=utf-8"});
    const empresa = await this.empresaService.getEmpresa();
    const cuitempresa = empresa.cuit.replace("-","").replace("-","");
    const periodoliquidacion = formatDate(this.fechaperiodoliquidacion+"-01","MMMM yyyy",'en-US')
    const nombreArchivo = `${cuitempresa}-${periodoliquidacion}-Liquidacion`;

    saveAs.saveAs(blob, nombreArchivo);
  }

  canRequest(){
    if(this.fechaperiodoliquidacion != "" && this.tipoliquidacion != ""){
      return true;
    } else {
      return false;
    }
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  refreshTableSorce() {

  }

}
