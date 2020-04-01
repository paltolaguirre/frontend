import { ListaItems } from './../../fcargassociales/fcargassociales.service';

export class LegajoServiceMock {
  public async getLegajos(sort: string, order: string, page: number): Promise<ListaItems> {
    return Promise.resolve({
      items: [],
      total_count: 0
    });
  }
};