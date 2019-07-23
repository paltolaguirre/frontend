import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Librosueldos } from './librosueldos.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosueldosService {
  href = '/api/informe/informes/libro-sueldos';
  
  constructor(private http: HttpClient) { }

  public async getLibrosueldos(sort: string, order: string, fechadesde : Date , fechahasta : Date, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`+"?fechadesde="+fechadesde+"&fechahasta="+fechahasta;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Librosueldos[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }
 
}
