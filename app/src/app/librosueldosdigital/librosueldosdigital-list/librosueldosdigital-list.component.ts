import { ListaItems, LibrosueldosdigitalService } from '../librosueldosdigital.service';
import { Librosueldosdigital } from '../librosueldosdigital.model';
import { Component, ViewChild, AfterViewInit, OnInit , Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatDate } from "@angular/common";
import { PrintService } from 'src/app/print/print.service';
import { saveAs } from 'file-saver';
import { EmpresaService } from 'src/app/empresa/empresa.service';

@Component({
    selector: 'app-librosueldosdigital-list',
    templateUrl: './librosueldosdigital-list.component.html',
    styleUrls: ['./librosueldosdigital-list.component.css']
})

export class LibrosueldosdigitalListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Apellido', 'Nombre', 'Periodo Liquidacion', 'Importe a Detraer'];
  dataSource: MatTableDataSource<Librosueldosdigital> = new MatTableDataSource<Librosueldosdigital>();
  public defaultDate$: Observable<Date>;

  fechaperiodoliquidacion: any;
  importedetraccion: any;
  tipoliquidacion: any;


  resultsLength = 0;
  isLoadingResults = true;
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
  ) {
    this.tipoliquidacion = "";
    this.fechaperiodoliquidacion = "";
    this.importedetraccion = "";
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


  
  async updateGrilla() {

   if (this.canRequest()){
    const librosueldosdigitalApi: ListaItems = await this.librosueldosdigitalService.getLibrosueldosdigital(this.sort.active, this.sort.direction,this.importedetraccion,this.tipoliquidacion,1);
    this.dataSource = new MatTableDataSource<Librosueldosdigital>(librosueldosdigitalApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
   
  }
  this.isLoadingResults = false;
}

  canRequest(){
    if(this.fechaperiodoliquidacion != "" && this.importedetraccion != "" && this.tipoliquidacion != ""){
      return true;
    } else {
      return false;
    }
  }

  notificacion(mensajeNotificacion:String){
    const notificacion = {
      codigo: 400,
      mensaje:mensajeNotificacion
    }
    const ret = this.notificationService.notify(notificacion);
    return ret;
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  /*async exportarTXT() {
  
    const empresa = await this.empresaService.getEmpresa();

    if(empresa.cuit == "") {
      const notificacion = {
        codigo: 400,
        mensaje: "Debe completar el CUIT del Agente de Retención."
      }
      const ret = this.notificationService.notify(notificacion);
      return ret;
    }
    const liquidacionfinalanualTXT: any = await this.liquidacionfinalanualService.getLiquidacionfinalanualTXT(this.tipopresentacion,this.anio,this.mes);
    var blob = new Blob([liquidacionfinalanualTXT.data], {type: "text/plain;charset=utf-8"});
    const cuitempresa = empresa.cuit.replace("-","").replace("-","");
    const secuencia = "0000"
    const nombreArchivo = `F1357.${cuitempresa}.${this.anio}0000.${secuencia}.txt`;
    saveAs.saveAs(blob, nombreArchivo);
  }*/

  refreshTableSorce() {

  }

}