import { FormulaTransferData } from './../../models/formula-transfer-data.model';
import { FormulaParam } from './../../models/formula-param.model';
import { FormulaScopes } from './../../constants/formula-scopes.constants';
import { FormulaTypes } from './../../constants/formula-types.constants';
import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from './../api-http/api-http.service';
import { FormulaCategory } from './../../models/formula-category.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Formula } from '../../models/formula.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  public readonly BASE_URL = '/api/formula';
  public formulas = new BehaviorSubject<Formula[]>([]);
  public formulasStore$ = this.formulas.asObservable();
  public formulaPickerItemEmitter: EventEmitter<FormulaTransferData> = new EventEmitter();

  constructor(private api: ApiHttpService) {
    this.updateFormulasStore();
  }

  public async updateFormulasStore() {
    this.formulas.next(await this.getAll());
  }

  public async getAll(): Promise<Formula[]> {
    return await this.api.get(`${this.BASE_URL}/formulas`).toPromise() as Formula[];
  }

  public async getByType(type: string): Promise<Formula[]> {
    return await this.api.get(`${this.BASE_URL}/formulas?type=${type}`).toPromise() as Formula[];
  }

  public async delete(name: string): Promise<any> {
    const response = await this.api.delete(`${this.BASE_URL}/formulas/${name}`).toPromise();

    this.updateFormulasStore();

    return response;
  }

  public async create(formula: Formula): Promise<any> {
    const response = await this.api.post(`${this.BASE_URL}/formulas`, formula).toPromise();

    this.updateFormulasStore();

    return response;
  }

  public async find(name: string): Promise<Formula> {
    return await this.api.get(`${this.BASE_URL}/formulas/${name}`).toPromise() as Formula;
  }

  public async update(name: string, formula: Formula) {
    const response = await this.api.put(`${this.BASE_URL}/formulas/${name}`, formula).toPromise();

    this.updateFormulasStore();

    return response;
  }

  public getFormulaCategories(): FormulaCategory[] {
    return [
      {
        id: 1,
        title: '',
        items: [
          {
            id: 1,
            img: 'assets/img/icono_search.png',
            imgActive: 'assets/img/icono_search_selec.png',
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
            img: 'assets/img/icono_variables.png',
            imgActive: 'assets/img/icono_variables_selec.png',
            title: 'Variables',
            categoryId: 2,
            slug: 'variables'
          },
          {
            id: 3,
            img: 'assets/img/icono_conceptos.png',
            imgActive: 'assets/img/icono_conceptos_selec.png',
            title: 'Conceptos en la liquidación',
            categoryId: 2,
            slug: 'concept'
          },
          {
            id: 4,
            img: 'assets/img/icono_parametros.png',
            imgActive: 'assets/img/icono_parametros_selec.png',
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
            img: 'assets/img/icono_formulas_xubio.png',
            imgActive: 'assets/img/icono_formulas_xubio_selec.png',
            title: 'Fórmulas estandar',
            categoryId: 3,
            slug: 'standard-formulas'
          },
          {
            id: 6,
            img: 'assets/img/icono_favoritas.png',
            imgActive: 'assets/img/icono_favoritas_selec.png',
            title: 'Mis fórmulas',
            categoryId: 3,
            slug: 'user-formulas'
          }
        ]
      }
    ];
  }

  public isEditable(formula: Formula): boolean {
    return formula.scope === 'private';
  }

  public extractBasicMathOperators(formulas: Formula[]): Formula[] {
    return formulas.filter((formula) => {
      const functionNames = ["Sum","Diff","Div","Multi",];
      return formula.type === FormulaTypes.OPERATOR && functionNames.includes(formula.name);
    });
  }

  public extractLogicalOperators(formulas: Formula[]): Formula[] {
    return formulas.filter((formula) => {
      const functionNames = ["If","Greater","Less","Equality","Inequality","And","Or"];
      return formula.type === FormulaTypes.OPERATOR && functionNames.includes(formula.name);
    });
  }

  public extractFormulasByType(formulas: Formula[], type: string): Formula[] {
    return formulas.filter((formula) => {
      return formula.type === type;
    });
  }

  public extractUserFormulas(formulas: Formula[]): Formula[] {
    return formulas.filter((formula) => {
      return (
        formula.type === FormulaTypes.GENERIC &&
        formula.scope === FormulaScopes.PRIVATE
      );
    });
  }

  public extractVariables(formulas: Formula[]): Formula[] {
    return formulas.filter((formula) => {
      return (
        formula.type === FormulaTypes.HELPER &&
        formula.scope === FormulaScopes.PUBLIC
      );
    });
  }

  public extractInputParams(formula: Formula): FormulaParam[] {
    return formula.params.map((param) => param);
  }

  public extractStandardFormulas(formulas: Formula[]): Formula[] {
    return formulas.filter((formula) => {
      return (
        formula.type === FormulaTypes.GENERIC &&
        formula.scope === FormulaScopes.PUBLIC
      );
    });
  }

  public emitFormulaItemClick(payload: FormulaTransferData) {
    this.formulaPickerItemEmitter.emit(payload);
  }

  public isPrimitive(formula: Formula): boolean {
    return formula.origin === 'primitive';
  }

  public isClonable(formula: Formula): boolean {
    return formula.origin !== 'primitive';
  }
}
