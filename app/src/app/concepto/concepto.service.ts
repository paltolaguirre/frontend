import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Concepto } from './concepto.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {
  href = '/api/concepto/conceptos';
  
  constructor(private http: HttpClient) { }

  public async getConceptos(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Concepto[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }

  public async getConcepto(conceptoId: number): Promise<Concepto> {
    let concepto = <Concepto>{};
    if (conceptoId) {
    const requestUrl =
      `${this.href}/${conceptoId}`;

    concepto  = await this.http.get<Concepto>(requestUrl).toPromise();
    }
    return concepto;
  }
  
  public async postConcepto(concepto: Concepto): Promise<Concepto> {
    const requestUrl =
      `${this.href}`; 
    
    concepto.activo = 1;

    const new_concepto = await this.http.post<Concepto>(requestUrl, concepto).toPromise();

    return new_concepto;
  }

  public async putConcepto(concepto: Concepto): Promise<Concepto> {
    const requestUrl =
      `${this.href}/${concepto.ID}`;

    const new_concepto = await this.http.put<Concepto>(requestUrl, concepto).toPromise();

    return new_concepto;
  }

  public async deleteConcepto(concepto: Concepto) {
    const requestUrl =
      `${this.href}/${concepto.ID}`;

    let res = await this.http.delete(requestUrl).toPromise();
    return res;
  }
}
