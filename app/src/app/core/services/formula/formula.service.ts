import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from './../api-http/api-http.service';
import { FormulaCategory } from './../../models/formula-category.model';
import { Injectable } from '@angular/core';
import { Formula } from '../../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  public readonly BASE_URL = '/api/formula';
  private formulas = new BehaviorSubject<Formula[]>([]);
  public formulasStore$ = this.formulas.asObservable();

  constructor(private api: ApiHttpService) {
    this.initFormulasStore();
  }

  public async initFormulasStore() {
    this.formulas.next(await this.getAll());
  }

  public async getAll(): Promise<Formula[]> {
    return await this.api.get(`${this.BASE_URL}/formulas`).toPromise() as Formula[];
  }

  public async delete(name: string): Promise<any> {
    return await this.api.delete(`${this.BASE_URL}/formulas/${name}`).toPromise();
  }

  public async create(formula: Formula): Promise<any> {
    return await this.api.post(`${this.BASE_URL}/formulas`, formula).toPromise();
  }

  public async find(name: string): Promise<Formula> {
    return await this.api.get(`${this.BASE_URL}/formulas/${name}`).toPromise() as Formula;
  }

  public async update(name: string, formula: Formula) {
    return await this.api.put(`${this.BASE_URL}/formulas/${name}`, formula).toPromise();
  }

  public getFormulaCategories(): FormulaCategory[] {
    return [
      {
        id: 1,
        title: '',
        items: [
          {
            id: 1,
            img: 'assets/img/descarga.jpg',
            title: 'Buscar',
            categoryId: 1,
            slug: 'search'
          }
        ]
      },
      {
        id: 2,
        title: 'Elementos',
        items: [
          {
            id: 2,
            img: 'assets/img/descarga.jpg',
            title: 'Variables',
            categoryId: 2,
            slug: 'variables'
          },
          {
            id: 3,
            img: 'assets/img/descarga.jpg',
            title: 'Conceptos en la liquidación',
            categoryId: 2,
            slug: 'concept'
          },
          {
            id: 4,
            img: 'assets/img/descarga.jpg',
            title: 'Parámetros de entrada',
            categoryId: 2,
            slug: 'input-params'
          }
        ]
      },
      {
        id: 3,
        title: 'Fórmulas',
        items: [
          {
            id: 5,
            img: 'assets/img/descarga.jpg',
            title: 'Fórmulas estandar',
            categoryId: 3,
            slug: 'standard-formulas'
          },
          {
            id: 6,
            img: 'assets/img/descarga.jpg',
            title: 'Mis fórmulas',
            categoryId: 3,
            slug: 'my-formulas'
          }
        ]
      }
    ];
  }

  public isEditable(formula: Formula): boolean {
    return formula.origin !== 'primitive';
  }
}
