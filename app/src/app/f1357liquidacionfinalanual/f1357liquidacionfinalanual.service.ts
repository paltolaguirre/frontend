import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { F1357liquidacionfinalanual } from './f1357liquidacionfinalanual.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class F1357liquidacionfinalanualService {
  href = '/api/f1357-liquidacion-anual';
  
  constructor(private http: HttpClient) { }

  public async getF1357liquidacionfinalanual(sort: string, order: string, tipopresentacion : String , anio : String, mes:String,  page: number): Promise<ListaItems> {
    const requestUrl =
    `${this.href}?tipopresentacion=${tipopresentacion}&anio=${anio}&mes=${mes}`;
     
    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<F1357liquidacionfinalanual[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }
 
  public async getLiquidacionfinalanualTXT(tipopresentacion : String , anio : String, mes:String): Promise<any> {
    let result = <any>{};

    const requestUrl =
    `${this.href}-exportartxt?tipopresentacion=${tipopresentacion}&anio=${anio}&mes=${mes}`;
    result  = await this.http.get<any>(requestUrl).toPromise();


    return result;
  }

}
