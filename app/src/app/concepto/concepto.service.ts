import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Concepto, TipoCalculoAutomatico, TIPO_CALCULO_AUTOMATICO, TIPO_CALCULO_AUTOMATICO_CODIGO } from './concepto.model';

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

  public async getAll(): Promise<Concepto[]> {
    return await this.http.get<Concepto[]>(this.href).toPromise();
  }

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
    let tipoCalculoAutomatico = <TipoCalculoAutomatico>{};
    concepto.tipocalculoautomatico = tipoCalculoAutomatico;
    concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.NO_APLICA;
    concepto.tipocalculoautomatico.codigo = TIPO_CALCULO_AUTOMATICO_CODIGO.NO_APLICA;
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
