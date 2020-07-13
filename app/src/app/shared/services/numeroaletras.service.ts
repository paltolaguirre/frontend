import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NumeroaletrasService {

    href = 'api/helper/importeenletras';
  constructor(private http: HttpClient) { }

  public async numeroALetras(n){
    
    let respuesta = <String>{};
    const requestUrl =
      `${this.href}/${n}`;

      respuesta = await this.http.get<String>(requestUrl).toPromise();

      return respuesta;

    }
}
