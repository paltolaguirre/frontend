import { LiquidacionService } from '../liquidacion.service';
import { Liquidacion, Liquidacionitem, LiquidacionItems } from '../liquidacion.model';
import { formatDate } from "@angular/common";
import { FormControl ,} from '@angular/forms';
import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public print$: Observable<string> = null;
  fechaperiododepositado: any;
  fechaperiodoliquidacion: any;
  public liquidacionItemHojaCalculo$: Observable<Liquidacionitem> = null;
  public mostrarLiquidacion$: Observable<boolean> = null;
  public estaGuardandose:boolean = false;

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

    this.mostrarLiquidacion$ = of(true)

    this.print$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let print = params.get('action');
        if(!print) print = 'default';
        
        return of(print);
      })
    );
  }

  ngAfterViewInit() {
    if(this.data && !this.data.liquidacionitems) this.data.liquidacionitems = new Array();
  }
  
  
  onClickNovedades(data): void {
    const dialogRef = this.dialog.open(DialogLiquidaciones, {
       data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onClickCalculoAutomatico(data)
    });
  }

  private gotoId() {
    this.router.navigate([`/liquidaciones/${this.id}`]);
  }

  private gotoPreview() {
    this.router.navigate([`/liquidaciones/${this.id}/imprimir`]);
  }

  private gotoPreview2Hojas() {
    this.router.navigate([`/liquidaciones/${this.id}/imprimircompleto`]);
  }

  private gotoGrilla() {
    this.estaGuardandose = true;
    this.router.navigate(['/liquidaciones']);
  }

  private onClickVerHojaDeCalculo(item: Liquidacionitem) {
    this.liquidacionItemHojaCalculo$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {        
        return item;
      })
    );
   
    this.mostrarLiquidacion$ = of(false)
  }


  private onClickCloseVerHojaDeCalculo() {
    this.liquidacionItemHojaCalculo$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {        
        return null;
      })
    );
    this.mostrarLiquidacion$ = of(true);
  }
  
  onClickId(): void {
    this.gotoId();
  }

  onClickPreview(): void {
    this.gotoPreview();
  }

  onClickPreview2Hojas(): void {
    this.gotoPreview2Hojas();
  }

  tieneCalculoAutomatico(item: Liquidacionitem): boolean {
    return item.acumuladores && item.acumuladores.length > 0 
  }

  async setCantidadDiasTrabajados(event:any, data:any){
   data.tipoid = event.ID
   data.tipo = event
   switch (event.codigo) { 
      case 'MENSUAL':
          data.cantidaddiastrabajados = 30;
          return;
      case 'SAC':
          data.cantidaddiastrabajados = 30;
          return;
      case 'PRIMER_QUINCENA':
        data.cantidaddiastrabajados = 15;
        return;
      case  'SEGUNDA_QUINCENA':
          data.cantidaddiastrabajados = 15;
          return;
      case 'VACACIONES':
          data.cantidaddiastrabajados = 0;
          return;
      case 'LIQUIDACION_FINAL':
        data.cantidaddiastrabajados = 0;
        return;
    }
  
  }

  blanquearFechaDesdeSituacionRevista(data:any){
    data.fechasituacionrevistauno = null;
    data.fechasituacionrevistados = null;
    data.fechasituacionrevistatres = null;
  }

  changeFechaDesdeSituacionRevista(fechasituacionrevista:any){
    if (fechasituacionrevista != null) { 
      const anioLiquidacion = this.fechaperiodoliquidacion.split("-")[0]
      const mesLiquidacion = this.fechaperiodoliquidacion.split("-")[1]
      
      const anioSituacionRevista = fechasituacionrevista.split("-")[0]
      const mesSituacionRevista = fechasituacionrevista.split("-")[1]
      
      
      var fechaliquidacionigualfechasituacionrevista = (anioLiquidacion == anioSituacionRevista && mesLiquidacion == mesSituacionRevista)

      if (!fechaliquidacionigualfechasituacionrevista){
        const notificacion = {
          codigo: 400,
          mensaje: "La Fecha Desde de Situación Revista debe pertenecer al Periodo Liquidación"
        }
        const ret = this.notificationService.notify(notificacion);
        return ret;
      }
    }

  }

  checkFechaPeriodoLiquidacion(){
    return this.fechaperiodoliquidacion == null
  }
  
  onClickAbort(): void {
    this.gotoGrilla();
  }

  onClickPrint() {
    this.printService.printTOPDF();
  }

  async onClickSave(data: Liquidacion): Promise<Liquidacion> {

    if (this.estaGuardandose) return null;

    this.estaGuardandose = true;
    let liquidacionesItem: Liquidacion;    
    
    this.formatData(data);
    let that = this;
    if (this.id) {
      console.log("Updated Liquidacion");
      liquidacionesItem = await this.liquidacionService.putLiquidacion(data).finally(function(){that.habilitarGuardado();});
      this.gotoGrilla();
    } else {
      console.log("Created Liquidacion");
      liquidacionesItem = await this.liquidacionService.postLiquidacion(data).finally(function(){that.habilitarGuardado();});
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(liquidacionesItem)
    return liquidacionesItem;    
  }


  habilitarGuardado() {
    this.estaGuardandose = false
  }

  onClickDeleteChild(child: any, arr: any) {
    if(child.ID) {
      child.DeletedAt = new Date();
    } else {
      this.removeItemFromArr(arr, child);
    }
  }

  public formatData(data: any) {
    if(data.fecha)data.fecha = formatDate(data.fecha, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(this.fechaperiododepositado)data.fechaperiododepositado = formatDate(this.fechaperiododepositado+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(this.fechaperiodoliquidacion)data.fechaperiodoliquidacion = formatDate(this.fechaperiodoliquidacion+"-01", "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechaultimodepositoaportejubilatorio)data.fechaultimodepositoaportejubilatorio = formatDate(data.fechaultimodepositoaportejubilatorio, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechasituacionrevistauno)data.fechasituacionrevistauno = formatDate(data.fechasituacionrevistauno, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechasituacionrevistados)data.fechasituacionrevistados = formatDate(data.fechasituacionrevistados, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechasituacionrevistatres)data.fechasituacionrevistatres = formatDate(data.fechasituacionrevistatres, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');


    if(data.legajo)data.legajoid = data.legajo.ID;
    if(data.banco)data.cuentabancoid = data.banco.ID;
    if(data.bancoaportejubilatorio)data.bancoaportejubilatorioid = data.bancoaportejubilatorio.ID;
    if(data.condicionpagos)data.condicionpago = data.condicionpagos.ID;
    if(data.tipo)data.tipoid = data.tipo.ID;
  }

  removeItemFromArr(arr: Array<any>, item: any) {
    const i = arr.indexOf(item);
    if (i !== -1) arr.splice(i, 1);
  }

  childrenCounter(items: Array<any>, tipoconcepto: string) {
    let arr;
    if(items) arr = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == tipoconcepto);

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
  
  onClickNewLiquidacionItem(data: any, tipoCodigo: string) {
    if(!data.liquidacionitems) {
      data.liquidacionitems = [{
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
      data.liquidacionitems.push({
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

  onClickNewImportesremunerativos(data: any) {
    this.onClickNewLiquidacionItem(data, TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
  }


  onClickNewImportesNoremunerativos(data: any) {
    this.onClickNewLiquidacionItem(data, TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
  }

  onClickNewDescuento(data: any) {
    this.onClickNewLiquidacionItem(data, TIPO_CONCEPTO_CODIGO.DESCUENTO);
  }
  

  onClickNewAportespatronales(data: any) {
    this.onClickNewLiquidacionItem(data, TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
  }

  onClickNewRetenciones(data: any) {
    this.onClickNewLiquidacionItem(data, TIPO_CONCEPTO_CODIGO.RETENCION);
  }

  calcularTotal(items: ImporteUnitario[], tipoconcepto: string): number {
    let array;
    if(items) array = items.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == tipoconcepto && item.DeletedAt == null);


    let total: number= 0;
    if(array) {
      array.forEach(element => {
        total += element.importeunitario;  
      });
    }
    return total;
  }

  calcularTotalRemunerativo(items: Liquidacionitem[]): number {
    const total = this.calcularTotal(items, TIPO_CONCEPTO_CODIGO.REMUNERATIVO);

    return total;
  }

  calcularTotalNoRemunerativo(items: Liquidacionitem[]): number {
    const total = this.calcularTotal(items, TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);

    return total;
  }

  calcularTotalDescuento(items: Liquidacionitem[]): number {
    const total = this.calcularTotal(items, TIPO_CONCEPTO_CODIGO.DESCUENTO);

    return total;
  }

  calcularTotalRetencion(items: Liquidacionitem[]): number {
    const total = this.calcularTotal(items, TIPO_CONCEPTO_CODIGO.RETENCION);

    return total;
  }

  calcularTotalAportePatronal(items: Liquidacionitem[]): number {
    const total = this.calcularTotal(items, TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);

    return total;
  }

  cantidadRemunerativo(items: Liquidacionitem[]): number {
    const cantidad = this.childrenCounter(items, TIPO_CONCEPTO_CODIGO.REMUNERATIVO);

    return cantidad;
  }

  cantidadNoRemunerativo(items: Liquidacionitem[]): number {
    const cantidad = this.childrenCounter(items, TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);

    return cantidad;
  }

  cantidadDescuento(items: Liquidacionitem[]): number {
    const cantidad = this.childrenCounter(items, TIPO_CONCEPTO_CODIGO.DESCUENTO);

    return cantidad;
  }

  cantidadRetencion(items: Liquidacionitem[]): number {
    const cantidad = this.childrenCounter(items, TIPO_CONCEPTO_CODIGO.RETENCION);

    return cantidad;
  }

  cantidadAportePatronal(items: Liquidacionitem[]): number {
    const cantidad = this.childrenCounter(items, TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);

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

  async conceptoSelected(currentLiquidacion: Liquidacion, item: Liquidacionitem, conceptoSelected, tipoconcepto) {
    item.concepto = this.getConcepto(conceptoSelected, tipoconcepto);
    item.conceptoid = item.concepto.ID;
    this.formatData(currentLiquidacion);
    const data = await this.liquidacionService.calculoAutomaticoLiquidacionByConcepto(currentLiquidacion, item.concepto.ID);
    if(data.importeunitario != null) item.importeunitario = data.importeunitario;
    item.acumuladores = data.acumuladores;
  }

  async cantidadChange(currentLiquidacion: Liquidacion, item: Liquidacionitem) {
    this.formatData(currentLiquidacion);
    const data = await this.liquidacionService.calculoAutomaticoLiquidacionByConcepto(currentLiquidacion, item.concepto.ID);
    if(data.importeunitario != null) item.importeunitario = data.importeunitario;
    item.acumuladores = data.acumuladores;
  }

  async onClickCalculoAutomatico(currentLiquidacion: Liquidacion) {
    this.formatData(currentLiquidacion);
    const data = await this.liquidacionService.calculoAutomaticoLiquidacion(currentLiquidacion);
    if(currentLiquidacion.liquidacionitems.length == data.liquidacionitems.length) {
      data.liquidacionitems.forEach((element, index) => {
        if(currentLiquidacion.liquidacionitems[index].conceptoid == element.conceptoid) {
          currentLiquidacion.liquidacionitems[index].importeunitario = element.importeunitario;
          currentLiquidacion.liquidacionitems[index].acumuladores = element.acumuladores;
        }
      });
    }
  }

  public esNoEditable(item:Liquidacionitem){
    return item.concepto.eseditable === false
  }

  setCurrentLiquidacion(liquidacion: Liquidacion) {

  }
}

