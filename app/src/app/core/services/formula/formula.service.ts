import { ApiHttpService } from './../api-http/api-http.service';
import { FormulaCategory } from './../../models/formula-category.model';
import { Injectable } from '@angular/core';
import { Formula } from '../../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  private readonly BASE_URL = '/api/formula';
  public formulas: Formula[];

  constructor(private api: ApiHttpService) {
    this.formulas = [
      {
        id: 1,
        name: 'Formula 1',
        description: '("Mejor remuneracion Remunerativa del Periodo" /2)*("Días del Período Trabajados" /180)'
      },
      {
        id: 2,
        name: 'Formula 2',
        description: 'Esta es otra'
      }
    ];
  }

  public async getAll(): Promise<Formula[]> {
    return await this.api.get(`${this.BASE_URL}/formulas`).toPromise() as Formula[];
  }

  // TODO: Remove from API.
  public delete(formula: Formula): Promise<any> {
    return Promise.resolve();
  }

  public find(id: number): Formula {
    return this.formulas.find(formula => formula.id === id);
  }

  public getFormulaCategories(): FormulaCategory[] {
    return [
      {
        id: 1,
        title: 'Elementos',
        items: [
          {
            id: 1,
            img: 'assets/img/descarga.jpg',
            title: 'Variables',
            categoryId: 1
          },
          {
            id: 2,
            img: 'assets/img/descarga.jpg',
            title: 'Conceptos en la liquidación',
            categoryId: 1
          },
          {
            id: 3,
            img: 'assets/img/descarga.jpg',
            title: 'Parámetros de entrada',
            categoryId: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Fórmulas',
        items: [
          {
            id: 4,
            img: 'assets/img/descarga.jpg',
            title: 'Fórmulas estandar',
            categoryId: 2
          },
          {
            id: 5,
            img: 'assets/img/descarga.jpg',
            title: 'Mis fórmulas',
            categoryId: 2
          }
        ]
      }
    ];
  }
}
