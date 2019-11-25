import { LiquidacionService } from '../liquidacion.service';
import { Liquidacion, Liquidacionitem, LiquidacionItems } from '../liquidacion.model';
import { formatDate } from "@angular/common";
import { FormControl ,} from '@angular/forms';
import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { DialogLiquidaciones } from './liquidacion-dialog/liquidacion-dialog.component';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { Novedad } from '../../novedad/novedad.model';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { variable } from '@angular/compiler/src/output/output_ast';
import { LiquidacionItem } from './liquidacion-print/liquidacion-print.component';
import { TIPO_CONCEPTO_CODIGO, Concepto } from 'src/app/concepto/concepto.model';
import { isNgTemplate } from '@angular/compiler';

export interface ImporteUnitario {
  importeunitario: number;    
}

@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.css']
})
export class LiquidacionComponent implements OnInit, AfterViewInit {
  public currentLiquidacion$: Observable<Liquidacion> = null;
  paises: any[];
  id: number;
  data: any;
  public print$: Observable<boolean> = null;
  fechaperiododepositado: any;
  fechaperiodoliquidacion: any;

  constructor(
    private route: ActivatedRoute,
    private liquidacionService: LiquidacionService, 
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService: PrintService
    ) { }
  
  ngOnInit() {
    this.currentLiquidacion$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Liquidacion");
        }
        this.id = +params.get('id');
        const liquidacion = await this.liquidacionService.getLiquidacion(this.id);
        this.fechaperiododepositado = liquidacion.fechaperiododepositado?liquidacion.fechaperiododepositado.substring(0, 7):liquidacion.fechaperiododepositado;
        this.fechaperiodoliquidacion = liquidacion.fechaperiodoliquidacion?liquidacion.fechaperiodoliquidacion.substring(0, 7):liquidacion.fechaperiodoliquidacion;
        console.log(liquidacion);
        
        return liquidacion;
      })
    );

    this.print$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const print = (params.get('action') == "imprimir");
        if (print) {
          console.log("Action Imprimir");
        }

        return of(print);
      })
    );
  }

  ngAfterViewInit() {

  }
  
  
  onClickNovedades(data): void {
    const dialogRef = this.dialog.open(DialogLiquidaciones, {
       data
    });

    dialogRef.afterClosed().subscribe(result => {
   
    });
  }

  private gotoId() {
    this.router.navigate([`/liquidaciones/${this.id}`]);
  }

  private gotoPreview() {
    this.router.navigate([`/liquidaciones/${this.id}/imprimir`]);
  }

  private gotoGrilla() {
    this.router.navigate(['/liquidaciones']);
  }
  
  onClickId(): void {
    this.gotoId();
  }

  onClickPreview(): void {
    this.gotoPreview();
  }
  
  onClickAbort(): void {
    this.gotoGrilla();
  }

  onClickPrint() {
    this.printService.printTOPDF();
  }

  async onClickSave(data: Liquidacion): Promise<Liquidacion> {
    let liquidacionesItem: Liquidacion;    
    
    if(data.fecha)data.fecha = formatDate(data.fecha, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(this.fechaperiododepositado)data.fechaperiododepositado = formatDate(this.fechaperiododepositado+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(this.fechaperiodoliquidacion)data.fechaperiodoliquidacion = formatDate(this.fechaperiodoliquidacion+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechaultimodepositoaportejubilatorio)data.fechaultimodepositoaportejubilatorio = formatDate(data.fechaultimodepositoaportejubilatorio, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
 
    if(data.legajo)data.legajoid = data.legajo.ID;
    if(data.banco)data.cuentabancoid = data.banco.ID;
    if(data.bancoaportejubilatorio)data.bancoaportejubilatorioid = data.bancoaportejubilatorio.ID;
    if(data.condicionpagos)data.condicionpago = data.condicionpagos.ID;
    if(data.tipo)data.tipoid = data.tipo.ID;

    if (this.id) {
      console.log("Updated Liquidacion");
      liquidacionesItem = await this.liquidacionService.putLiquidacion(data);
      this.gotoGrilla();
    } else {
      console.log("Created Liquidacion");
      liquidacionesItem = await this.liquidacionService.postLiquidacion(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(liquidacionesItem)
    return liquidacionesItem;
  }

  onClickDeleteChild(child: any, arr: any) {
    if(child.ID) {
      child.DeletedAt = new Date();
    } else {
      this.removeItemFromArr(arr, child);
    }
  }

  removeItemFromArr(arr: Array<any>, item: any) {
    const i = arr.indexOf(item);
    if (i !== -1) arr.splice(i, 1);
  }

  childrenCounter(arr: Array<any>) {
    let ret;
    if(arr) {
      const elementosNoBorrados = arr.filter(function (child) {
        return child.DeletedAt == null;
      });
      ret = elementosNoBorrados.length;
    } else {
      ret = 0;
    }

    return ret;
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }
  
  onClickNewLiquidacionItem(items: Liquidacionitem[], tipoCodigo: string) {
    if(items == null) {
      items = [{
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        concepto: {
          nombre: null,
          codigo: null,
          descripcion: null,
          activo: null,
          tipo: null,
          cuentacontableid: null,
          esimprimible: null,
          tipoconcepto: {
            nombre: null,
            codigo: tipoCodigo,
          }
        },
        conceptoid: null,
        importeunitario: null,
        cantidad: null,
      }];      
    } else {
      items.push({
        ID: null,
        CreatedAt: null,
        UpdatedAt: null,
        DeletedAt: null,
        concepto: {
          nombre: null,
          codigo: null,
          descripcion: null,
          activo: null,
          tipo: null,
          cuentacontableid: null,
          esimprimible: null,
          tipoconcepto: {
            nombre: null,
            codigo: tipoCodigo,
          }
        },
        conceptoid: null,
        importeunitario: null,
        cantidad: null,
      });
    }
  }

  onClickNewImportesremunerativos(items: Liquidacionitem[]) {
    this.onClickNewLiquidacionItem(items, TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
  }


  onClickNewImportesNoremunerativos(items: Liquidacionitem[]) {
    this.onClickNewLiquidacionItem(items, TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
  }

  onClickNewDescuento(items: Liquidacionitem[]) {
    this.onClickNewLiquidacionItem(items, TIPO_CONCEPTO_CODIGO.DESCUENTO);
  }
  

  onClickNewAportespatronales(items: Liquidacionitem[]) {
    this.onClickNewLiquidacionItem(items, TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
  }

  onClickNewRetenciones(items: Liquidacionitem[]) {
  }

  calcularTotal(array: ImporteUnitario[]): number {
    let total: number= 0;
    if(array) {
      array.forEach(element => {
        total += element.importeunitario;  
      });
    }
    return total;
  }

  calcularTotalRemunerativo(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
    const total = this.calcularTotal(array);

    return total;
  }

  calcularTotalNoRemunerativo(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
    const total = this.calcularTotal(array);

    return total;
  }

  calcularTotalDescuento(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.DESCUENTO);
    const total = this.calcularTotal(array);

    return total;
  }

  calcularTotalRetencion(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.RETENCION);
    const total = this.calcularTotal(array);

    return total;
  }

  calcularTotalAportePatronal(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
    const total = this.calcularTotal(array);

    return total;
  }

  cantidadRemunerativo(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
    const cantidad = this.childrenCounter(array);

    return cantidad;
  }

  cantidadNoRemunerativo(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
    const cantidad = this.childrenCounter(array);

    return cantidad;
  }

  cantidadDescuento(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.DESCUENTO);
    const cantidad = this.childrenCounter(array);

    return cantidad;
  }

  cantidadRetencion(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.RETENCION);
    const cantidad = this.childrenCounter(array);

    return cantidad;
  }

  cantidadAportePatronal(items: Liquidacionitem[]): number {
    const array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
    const cantidad = this.childrenCounter(array);

    return cantidad;
  }

  isDeleted(item: Liquidacionitem): boolean {
    return !(item && item.DeletedAt == null);
  }

  isRemunerativo(item: Liquidacionitem): boolean {
    return (item && item.concepto.tipoconcepto && item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
  }
  
  isNoRemunerativo(item: Liquidacionitem): boolean {
    return (item && item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
  }

  isDescuento(item: Liquidacionitem): boolean {
    return (item && item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.DESCUENTO);
  }

  isRetencion(item: Liquidacionitem): boolean {
    return (item && item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.RETENCION);
  }

  isAportePatronal(item: Liquidacionitem): boolean {
    return (item && item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
  }

  getConcepto(conceptoSelected, tipoconcepto): Concepto {
    console.log(conceptoSelected);

    conceptoSelected.tipoconcepto = {
      nombre: null,
      codigo: tipoconcepto,
    };

    return conceptoSelected;
  }
}