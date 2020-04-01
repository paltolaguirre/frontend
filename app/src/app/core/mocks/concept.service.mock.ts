import { Concepto } from 'src/app/concepto/concepto.model';
export class ConceptServiceMock {
  public href = '/api/concepto/conceptos';

  public async getAll(): Promise<any> {
    return Promise.resolve([]);
  }

  public async getConceptos(sort: string, order: string, page: number): Promise<any> {
    return Promise.resolve([]);
  }

  public async getConcepto(conceptoId: number): Promise<any> {
    return Promise.resolve({});
  }

  public async postConcepto(concepto: Concepto): Promise<any> {
    return Promise.resolve({});
  }

  public async putConcepto(concepto: Concepto): Promise<any> {
    return Promise.resolve({});
  }

  public async deleteConcepto(concepto: Concepto) {
    return Promise.resolve({});
  }
}
