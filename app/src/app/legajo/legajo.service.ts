import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectorElement } from '../shared/selector-default/selector-default.component';
import { Legajo } from './legajo.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

/*export interface HijoItem {
  ID: number;
  nombre: string;
  apellido: string;
  codigo: string;
  descripcion: string;
  cuil: string;
  obrasocialid?: number;
  DeletedAt?: Date;
}

export interface LegajosItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null,
  nombre: string;
  apellido: string;
  codigo: string;
  descripcion: string;
  activo: number;
  legajo: string;
  cuil: string;
  cbu: string;
  direccion: string;
  // selector
  pais?: SelectorElement,
  paisid: Number,
  // items 
  hijos: [HijoItem]
};*/

@Injectable({
  providedIn: 'root'
})
export class LegajoService {
  href = '/api/legajo/legajos';
  
  constructor(private http: HttpClient) { }

  public async getLegajos(sort: string, order: string, page: number): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Legajo[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }

  public async getLegajo(legajoId: number): Promise<Legajo> {
    let legajo = <Legajo>{};
    if (legajoId) {
    const requestUrl =
      `${this.href}/${legajoId}`;

      legajo  = await this.http.get<Legajo>(requestUrl).toPromise();
    }
    return legajo;
  }
  
  public async postLegajo(legajo: Legajo): Promise<Legajo> {
    const requestUrl =
      `${this.href}`;

    legajo.activo = 1;

    legajo = await this.http.post<Legajo>(requestUrl, legajo).toPromise();

    return legajo;
  }

  public async putLegajo(legajo: Legajo): Promise<Legajo> {
    const requestUrl =
      `${this.href}/${legajo.ID}`;

    const new_legajo = await this.http.put<Legajo>(requestUrl, legajo).toPromise();

    return new_legajo;
  }

  public async deleteLegajo(legajo: Legajo) {
    const requestUrl =
      `${this.href}/${legajo.ID}`;

    let res = await this.http.delete(requestUrl).toPromise();
    return res;
  }
}
