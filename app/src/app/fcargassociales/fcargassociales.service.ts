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
      `${this.href}?fechadesde=${fechadesde.toISOString().substring(0, 10)}&fechahasta=${fechahasta.toISOString().substring(0, 10)}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Fcargassociales[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }
 
  public async getFcargassocialesTXT(fechadesde : Date , fechahasta : Date, importedetraccion: number): Promise<any> {
    let result = <any>{};

    const requestUrl =
      `${this.href}-exportartxt?fechadesde=${fechadesde.toISOString().substring(0, 10)}&fechahasta=${fechahasta.toISOString().substring(0, 10)}&importedetraccion=${importedetraccion}`;

    result  = await this.http.get<any>(requestUrl).toPromise();


    return result;
  }

}
