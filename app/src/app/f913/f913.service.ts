import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { F913 } from './f913.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class F913Service {
  href = '/api/informe/informes/f913';
  
  constructor(private http: HttpClient) { }

  public async getF913s(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`+"?fechadesde=01-01-1990&fechahasta=01-01-2020";

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<F913[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }
 
}
