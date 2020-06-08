import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Librosueldosdigital } from './librosueldosdigital.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosueldosdigitalService {
  href = '/api/informe/informes/afip-libro-sueldos-digital';
  
  constructor(private http: HttpClient) { }

  public async getLibrosueldosdigital(sort: string, order: string, tipoliquidacion : string , periodomensual : string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`+"?tipoliquidacion="+tipoliquidacion+"&periodomensual="+periodomensual;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Librosueldosdigital[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems; 
  }

  public async getLibrosueldosdigitalTXTConceptosAFIP(): Promise<any> {
    let result = <any>{};

    const requestUrl =
      `${this.href}-exportartxt-conceptosafip`;

    result  = await this.http.get<any>(requestUrl).toPromise();


    return result;
  }

  public async getLibrosueldosdigitalTXTLiquidacionesPeriodo(tipoliquidacion : string , periodomensual : string, importedetraccion: number): Promise<any> {
    let result = <any>{};

    const requestUrl =
      `${this.href}-exportartxt-liquidacionesperiodo?tipoliquidacion="+tipoliquidacion+"&periodomensual="+periodomensual&importedetraccion=${importedetraccion}`;

    result  = await this.http.get<any>(requestUrl).toPromise();


    return result;
  }
 

}
