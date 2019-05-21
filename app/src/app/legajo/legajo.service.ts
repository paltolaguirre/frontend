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
    const requestUrl =
      `${this.href}/${legajoId}`;

    let legajo: Legajo;
    legajo  = await this.http.get<Legajo>(requestUrl).toPromise();

    return legajo;
  }
  
  public async postLegajo(legajo: Legajo): Promise<Legajo> {
    const requestUrl =
      `${this.href}`;

    let legajoCompleto: Legajo = {
      nombre: "Carlos",
      apellido: "Flores",
      codigo: "CARLOSF",
      descripcion: "Algooo",
      activo: 1,
      legajo: "Legajo 1",
      cuil: "36548787",
      direccion: "Av. Cabildo 2779",
      paisid: 1,
      provinciaid: 1,
      localidadid: 1,
      zonaid: 1,
      telefono: "212131321312",
      email: "cflores@finnegans.com.ar",
      modalidadcontratacionid: 1,
      categoria: "Categoria 1",
      tarea: "Tarea 1",
      situacionid: 1,
      condicionid: 1,
      condicionsiniestradoid: 1,
      obrasocialid: 1,
      conveniocolectivoid: 1,
      valorfijolrt: 20,
      conyuge: [{
        nombre: "Juana",
        apellido: "Pereza",
        codigo: "JUANA",
        descripcion: "",
        activo: 1,
        cuil: "21121321321",
        obrasocialid: 1
      }],
      hijos: null,
      remuneracion: 1200,
      horasmensualesnormales: "15",
      fechaalta: "0000-12-31T20:06:12-03:53",
      fechabaja: "0000-12-31T20:06:12-03:53",
      centrodecostoid: 1,
      cbu: "12333333333333333333333"
    };
    legajoCompleto.legajo = legajo.legajo;
    legajoCompleto.nombre = legajo.nombre;
    legajoCompleto.apellido = legajo.apellido;
    legajoCompleto.cbu = legajo.cbu;
    legajoCompleto.hijos = legajo.hijos;


    legajo = await this.http.post<Legajo>(requestUrl, legajoCompleto).toPromise();

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
