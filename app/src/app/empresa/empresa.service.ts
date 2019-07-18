import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from './empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  href = '/api/empresa/empresas';

  constructor(private http: HttpClient) { }

  public async getEmpresa(empresaId: number): Promise<Empresa> {
    let empresa = <Empresa>{};
    if (empresaId) {
      const requestUrl =
        `${this.href}/${empresaId}`;

      empresa = await this.http.get<Empresa>(requestUrl).toPromise();
    }
    return empresa;
  }

}
