import { ListaItems, F1357liquidacionfinalanualService } from '../f1357liquidacionfinalanual.service';
import { F1357liquidacionfinalanual } from '../f1357liquidacionfinalanual.model';
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
    selector: 'app-f1357liquidacionfinalanual-list',
    templateUrl: './f1357liquidacionfinalanual-list.component.html',
    styleUrls: ['./f1357liquidacionfinalanual-list.component.css']
})

export class F1357liquidacionfinalanualListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Legajo', 'Remuneraciones', 'Deducciones Generales', 'Deducciones Personales', 'Impuesto Determinado'];
  dataSource: MatTableDataSource<F1357liquidacionfinalanual> = new MatTableDataSource<F1357liquidacionfinalanual>();

  tipopresentacion: any;
  anio: any;
  mes: any;


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  liquidacionfinalanualID$: Observable<String>;
  public currentLiquidacionfinalanual$: Observable<F1357liquidacionfinalanual> = null;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private liquidacionfinalanualService: F1357liquidacionfinalanualService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public printService: PrintService,
    private empresaService: EmpresaService,
  ) {
   /*if(localStorage.getItem('liquidacionfinalanual-tipopresentacion')) {
      this.tipopresentacion = localStorage.getItem('liquidacionfinalanual-tipopresentacion');
    } else {
      this.tipopresentacion = "";
    }
    if(localStorage.getItem('liquidacionfinalanual-anio')) {
      this.anio = localStorage.getItem('liquidacionfinalanual-anio');
    } else {
      this.anio = "";
    }
    if(localStorage.getItem('liquidacionfinalanual-mes')) {
      this.mes = localStorage.getItem('liquidacionfinalanual-mes');
    } else {
      this.mes = "";
    }*/
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


  changeTipoPresentacion(option) {
    this.tipopresentacion = option.nombre;
  }
  
  public onYearSelectChange(payload: number, data: F1357liquidacionfinalanual) {
    this.anio = payload;
    this.updateGrilla();
    
  }
 
  changeMes(option) {
    this.mes = option.ID + 1;
    this.updateGrilla();
  }
  
  async updateGrilla() {
    const liquidacionfinalanualApi: ListaItems = await this.liquidacionfinalanualService.getF1357liquidacionfinalanual(this.sort.active, this.sort.direction,this.tipopresentacion,this.anio,this.mes, 1);
    this.dataSource = new MatTableDataSource<F1357liquidacionfinalanual>(liquidacionfinalanualApi.items);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por página";
    this.isLoadingResults = false;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  /*async exportarTXT() {
  
    const empresa = await this.empresaService.getEmpresa();
    const liquidacionfinalanualTXT: any = await this.liquidacionfinalanualService.getLiquidacionfinalanualTXT(this.fechadesde,this.fechahasta);
    var blob = new Blob([liquidacionfinalanualTXT.data], {type: "text/plain;charset=utf-8"});
    
    const anio = parseInt(this.periodo.split("-")[0]);
    const mes = parseInt(this.periodo.split("-")[1]);
    const nombreArchivo = `${empresa.cuit}_${anio}-${mes}_0_`;
    saveAs.saveAs(blob, nombreArchivo);
  }*/

  refreshTableSorce() {

  }

}