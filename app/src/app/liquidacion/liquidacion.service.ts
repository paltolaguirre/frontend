import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Liquidacion } from './liquidacion.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {
  href = '/api/liquidacion/liquidaciones';
  
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
}