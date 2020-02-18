import { FormulaCategory } from './../models/formula-category.model';
import { Formula } from '../models/formula.model';

export class FormulaServiceMock {
  fakeFormulaItem: Formula = {
    name: 'Formula 1',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    params: [],
    description: 'Esta es una formula',
    origin: '',
    type: '',
    scope: '',
    result: '',
    value: 1,
    valueid: 1
  };

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

  public getAll() {
    return Promise.resolve([]);
  }

  public delete(formula: Formula): Promise<any> {
    return Promise.resolve();
  }

  public async find(name: string): Promise<Formula> {
    return Promise.resolve(this.fakeFormulaItem);
  }
}