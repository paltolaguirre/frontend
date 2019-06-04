import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Novedad } from './novedad.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  href = '/api/novedad/novedades';
  
  constructor(private http: HttpClient) { }

  public async getNovedades(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Novedad[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }

  public async getNovedad(novedadId: number): Promise<Novedad> {
    let novedad = <Novedad>{};
    if (novedadId) {
    const requestUrl =
      `${this.href}/${novedadId}`;

      novedad  = await this.http.get<Novedad>(requestUrl).toPromise();
    }
    return novedad;
  }
  
  public async postNovedad(novedad: Novedad): Promise<Novedad> {
    const requestUrl =
      `${this.href}`; 
    
    novedad.activo = 1;

    novedad = await this.http.post<Novedad>(requestUrl, novedad).toPromise();

    return novedad;
  }

  public async putNovedad(novedad: Novedad): Promise<Novedad> {
    const requestUrl =
      `${this.href}/${novedad.ID}`;

    const new_novedad = await this.http.put<Novedad>(requestUrl, novedad).toPromise();

    return new_novedad;
  }

  public async deleteNovedad(novedad: Novedad) {
    const requestUrl =
      `${this.href}/${novedad.ID}`;

    let res = await this.http.delete(requestUrl).toPromise();
    return res;
  }
}
