import { Injectable } from '@angular/core';
import { Formula } from '../../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  public formulas: Formula[];

  constructor() {
    this.formulas = [
      {
        id: 1,
        name: 'Formula 1',
        description: 'Esta es una formula'
      },
      {
        id: 2,
        name: 'Formula 2',
        description: 'Esta es otra'
      }
    ];
  }

  public async getAll(): Promise<Formula[]> {
    return this.formulas;
  }

  // TODO: Remove from API.
  public delete(formula: Formula): Promise<any> {
    return Promise.resolve();
  }

  public find(id: number): Formula {
    return this.formulas.find(formula => formula.id === id);
  }
}
