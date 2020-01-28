import { Injectable } from '@angular/core';
import { Formula } from '../../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  constructor() { }

  public async getAll(): Promise<Formula[]> {
    return[
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
}
