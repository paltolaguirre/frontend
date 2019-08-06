import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Fcargassociales } from './fcargassociales.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class FcargassocialesService {
  href = '/api/informe/informes/cargas-sociales-f931';
  
  constructor(private http: HttpClient) { }

  public async getFcargassocialess(sort: string, order: string, fechadesde : Date , fechahasta : Date, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`+"?fechadesde="+fechadesde+"&fechahasta="+fechahasta;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Fcargassociales[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }
 
  public async getFcargassocialesTXT(fechadesde : Date , fechahasta : Date, importedetraccion: number): Promise<any> {
    let result = <any>{};

    fechadesde = new Date("2000-12-12")
    fechahasta = new Date("2019-12-12")
    importedetraccion = 999

    const requestUrl = `${this.href}-exportartxt?fechadesde=2000-12-12&fechahasta=2019-12-12&importedetraccion=${importedetraccion}`;

    result  = await this.http.get<any>(requestUrl).toPromise();

    return result;
  }

}
