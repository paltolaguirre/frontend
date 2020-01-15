import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Siradig } from './siradig.model';

export interface ListaItems {
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class SiradigService {
  href = 'https://f4a8d118-b5de-4c0a-b0bd-a79fce89631b.mock.pstmn.io/api/siradig/siradigs';
  
  constructor(private http: HttpClient) { }

  public async getSiradigs(): Promise<ListaItems> {
    const requestUrl =
      `${this.href}`;

    let listaItems: ListaItems = { items: null, total_count: null };
    listaItems.items = await this.http.get<Siradig[]>(requestUrl).toPromise();
    listaItems.total_count = listaItems.items.length;

    return listaItems;
  }

  public async getSiradig(siradigId: number): Promise<Siradig> {
    let siradig = <Siradig>{};
    if (siradigId) {
    const requestUrl =
      `${this.href}/${siradigId}`;

      siradig  = await this.http.get<Siradig>(requestUrl).toPromise();
    }
    return siradig;
  }
  
  public async postSiradig(siradig: Siradig): Promise<Siradig> {
    const requestUrl =
      `${this.href}`;

    siradig = await this.http.post<Siradig>(requestUrl, siradig).toPromise();

    return siradig;
  }

  public async putSiradig(siradig: Siradig): Promise<Siradig> {
    const requestUrl =
      `${this.href}/${siradig.ID}`;

    const new_siradig = await this.http.put<Siradig>(requestUrl, siradig).toPromise();

    return new_siradig;
  }

  public async deleteSiradig(siradig: Siradig) {
    const requestUrl =
      `${this.href}/${siradig.ID}`;

    let res = await this.http.delete(requestUrl).toPromise();
    return res;
  }
}
