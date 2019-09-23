import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Liquidacion , Fechaliquidaciones, LiquidacionItems, LiquidacionCalculada, TipoItem, DuplicarLiquidaciones, ResultProcesamientoMasivo } from './liquidacion.model';

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
  
  constructor(private http: HttpClient) { }

  public async getLiquidaciones(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

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

  public async postContabilizarLiquidacion(elementsRequest:  number[]): Promise<any> {
    const requestUrl = `${this.hrefContabilizar}`;    
    const contabilizar = { idsliquidacionesacontabilizar: elementsRequest, descripcion: "Alguna descripcion"};
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

    liquidacion.importesremunerativos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Remunerativo;
      result.total.remunerativo += element.importeunitario;
      result.items.push(item);
    });

    liquidacion.descuentos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Descuento;
      result.total.descuento += element.importeunitario;
      result.items.push(item);
    });

    liquidacion.retenciones.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.Retencion;
      result.total.retencion += element.importeunitario;
      result.items.push(item);
    });

    liquidacion.importesnoremunerativos.forEach(element => {
      let item = { codigo: "", detalle: "", cantidad: "", importe: null, tipo: null };
      item.codigo = element.conceptoid.toString();
      item.detalle = element.concepto.nombre;
      item.importe = element.importeunitario;
      item.tipo = TipoItem.NoRemunerativo;
      result.total.noremunerativo += element.importeunitario;
      result.items.push(item);
    });

    result.total.neto = result.total.remunerativo + result.total.noremunerativo - result.total.descuento - result.total.retencion;
    
    return result;
  }
  
}
