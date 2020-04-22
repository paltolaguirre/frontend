import { FormulaFixtures } from './../fixtures/formulas.fixtures';
import { EventEmitter } from '@angular/core';
import { FormulaTransferData } from './../models/formula-transfer-data.model';
import { BehaviorSubject } from 'rxjs';
import { FormulaCategory } from './../models/formula-category.model';
import { Formula } from '../models/formula.model';

export class FormulaServiceMock {

  private formulas = new BehaviorSubject<Formula[]>([]);
  public formulasStore$ = this.formulas.asObservable();
  public formulaPickerItemEmitter: EventEmitter<FormulaTransferData> = new EventEmitter();

  fakeFormulaItem: Formula = FormulaFixtures.getAll()[0];

  public getFormulaCategories(): FormulaCategory[] {
    return [
      {
        id: 1,
        title: '',
        items: [
          {
            id: 1,
            img: 'assets/img/descarga.jpg',
            imgActive: '',
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
            imgActive: '',
            title: 'Variables',
            categoryId: 2,
            slug: 'variables'
          },
          {
            id: 3,
            img: 'assets/img/descarga.jpg',
            imgActive: '',
            title: 'Conceptos en la liquidación',
            categoryId: 2,
            slug: 'concept'
          },
          {
            id: 4,
            img: 'assets/img/descarga.jpg',
            imgActive: '',
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
            imgActive: '',
            title: 'Fórmulas estandar',
            categoryId: 3,
            slug: 'standard-formulas'
          },
          {
            id: 6,
            img: 'assets/img/descarga.jpg',
            imgActive: '',
            title: 'Mis fórmulas',
            categoryId: 3,
            slug: 'my-formulas'
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

  public isEditable(formula: Formula): boolean {
    return true;
  }

  public extractBasicMathOperators() {
    return [];
  }

  public extractLogicalOperators() {
    return [];
  }

  public extractFormulasByType(formulas: Formula[], type: string): Formula[] {
    return [];
  }

  public extractUserFormulas(formulas: Formula[]): Formula[] {
    return [];
  }

  public extractVariables(formulas: Formula[]): Formula[] {
    return [];
  }

  public extractInputParams(formula: Formula): any[] {
    return [];
  }

  public extractStandardFormulas(formulas: Formula[]): Formula[] {
    return [];
  }

  public emitFormulaItemClick(payload: FormulaTransferData) {
    return null;
  }
}
