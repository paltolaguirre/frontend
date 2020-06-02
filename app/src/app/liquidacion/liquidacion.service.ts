import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Liquidacion , Fechaliquidaciones, LiquidacionItems, LiquidacionCalculada, TipoItem, DuplicarLiquidaciones, ResultProcesamientoMasivo, Contabilizar, CalculoAutomatico, Liquidacionitem } from './liquidacion.model';
import { TIPO_CONCEPTO_CODIGO } from '../concepto/concepto.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {
  href = '/api/liquidacion/liquidaciones';
  hrefContabilizar = 'api/liquidacion/contabilizar';
  hrefDuplicar = 'api/liquidacion/duplicar';
  hrefCalculoAutomatico = 'api/liquidacion/calculoautomatico';
  
  constructor(private http: HttpClient) { }

  public async getLiquidaciones(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Liquidacion[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }

  public async getLiquidacionesPorFecha(sort: string, order: string, page: number, fechadesde: string, fechahasta:string): Promise<ListaItems> {
    const requestUrl =
      `${this.href}?fechadesde=` + fechadesde + `&fechahasta=` + fechahasta;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Liquidacion[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }


  public async getLiquidacion(liquidacionId: number): Promise<Liquidacion> {
    let liquidacion = <Liquidacion>{};
    if (liquidacionId) {
    const requestUrl =
      `${this.href}/${liquidacionId}`;

      liquidacion  = await this.http.get<Liquidacion>(requestUrl).toPromise();
    }
    return liquidacion;
  }
  
  public async postLiquidacion(liquidacion: Liquidacion): Promise<Liquidacion> {
    const requestUrl =
      `${this.href}`; 
    
    liquidacion.activo = 1;

    liquidacion = await this.http.post<Liquidacion>(requestUrl, liquidacion).toPromise();

    return liquidacion;
  }

  public async postContabilizarLiquidacion(contabilizar:  Contabilizar): Promise<any> {
    const requestUrl = `${this.hrefContabilizar}`;    
    var response = await this.http.post<any>(requestUrl, contabilizar).toPromise();
    return response;
  }

  public async putLiquidacion(liquidacion: Liquidacion): Promise<Liquidacion> {
    const requestUrl =
      `${this.href}/${liquidacion.ID}`;

    const new_liquidacion = await this.http.put<Liquidacion>(requestUrl, liquidacion).toPromise();

    return new_liquidacion;
  }

  public async deleteLiquidacion(liquidacion: Liquidacion) {
    const requestUrl =
      `${this.href}/${liquidacion.ID}`;

    let res = await this.http.delete(requestUrl).toPromise();
    return res;
  }

  public async postDuplicarLiquidaciones(duplicarLiquidaciones: DuplicarLiquidaciones): Promise<ResultProcesamientoMasivo> {
    const requestUrl =
      `${this.hrefDuplicar}`; 
    
    const resultProcesamientoMasivo = await this.http.post<ResultProcesamientoMasivo>(requestUrl, duplicarLiquidaciones).toPromise();

    return resultProcesamientoMasivo;
  }

  calcularLiquidacion(liquidacion: Liquidacion): LiquidacionItems {
    const result = {
      items: [],
      total: {
        remunerativo: 0,
        noremunerativo: 0,
        descuento: 0,
        retencion: 0,
        neto: 0
      }
    };

    const importesremunerativos = liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
    const importesnoremunerativos = liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
    const descuentos = liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.DESCUENTO);
    const retenciones = liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.RETENCION);

    importesremunerativos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Remunerativo;
      result.total.remunerativo += element.importeunitario;
      result.items.push(item);
    });

    descuentos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Descuento;
      result.total.descuento += element.importeunitario;
      result.items.push(item);
    });

    retenciones.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Retencion;
      result.total.retencion += element.importeunitario;
      result.items.push(item);
    });

    importesnoremunerativos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.NoRemunerativo;
      result.total.noremunerativo += element.importeunitario;
      result.items.push(item);
    });

    result.total.remunerativo = this.round2(result.total.remunerativo);
    result.total.noremunerativo = this.round2(result.total.noremunerativo);
    result.total.descuento = this.round2(result.total.descuento);
    result.total.retencion = this.round2(result.total.retencion);
    result.total.neto = this.round2(result.total.remunerativo + result.total.noremunerativo - result.total.descuento - result.total.retencion);
    
    return result;
  }

  private round2(number: number): number {
    return Math.round(((number + Number.EPSILON) * 100) / 100)
  }
  
  public async calculoAutomaticoLiquidacion(liquidacion: Liquidacion): Promise<Liquidacion> {
    const requestUrl =
      `${this.hrefCalculoAutomatico}`;
    
    const new_liquidacion = await this.http.put<Liquidacion>(requestUrl, liquidacion).toPromise();

    return new_liquidacion;
  }

  public async calculoAutomaticoLiquidacionByConcepto(liquidacion: Liquidacion, conceptoid: number): Promise<CalculoAutomatico> {
    const requestUrl =
      `${this.hrefCalculoAutomatico}/${conceptoid}`;
    
    const calculo = await this.http.put<CalculoAutomatico>(requestUrl, liquidacion).toPromise();

    return calculo;
  }
}
