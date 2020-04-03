import { FormulaTransferData } from './../../models/formula-transfer-data.model';
import { FormulaParam } from './../../models/formula-param.model';
import { FormulaScopes } from './../../constants/formula-scopes.constants';
import { FormulaTypes } from './../../constants/formula-types.constants';
import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from './../api-http/api-http.service';
import { FormulaCategory } from './../../models/formula-category.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Formula } from '../../models/formula.model';
import { FormulaTerm } from 'src/app/formula/components/formula-drop-space/formula-drop-space.component';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  public readonly BASE_URL = '/api/formula';
  private formulas = new BehaviorSubject<Formula[]>([]);
  public formulasStore$ = this.formulas.asObservable();
  public formulaPickerItemEmitter: EventEmitter<FormulaTransferData> = new EventEmitter();

  private formulaTermsSubject = new BehaviorSubject<FormulaTerm[]>([]);
  public formulaTerms$ = this.formulaTermsSubject.asObservable();

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
            slug: 'user-formulas'
          }
        ]
      }
    ];
  }

  public isEditable(formula: Formula): boolean {
    return formula.origin !== 'primitive';
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

  public addFormulaTerm(data: FormulaTransferData, children?: FormulaTerm[]) {
    const formulaTerm: any = {
      nodeId: data.nodeId,
      payload: data.payload,
      children
    };

    this.formulaTermsSubject.next([...this.formulaTermsSubject.getValue(), ...formulaTerm]);
  }

  public clearFormulaTerms() {
    this.formulaTermsSubject.next([]);
  }

  public async updateFormulaChildTerm(inputParamId: string, value: any) {
    const terms = this.formulaTermsSubject.getValue();
    let selectedTerm: FormulaTerm;

    terms.forEach((term) => {
      selectedTerm = this.findChildTermDeeply(term, inputParamId);

      console.log('encontrado: ', selectedTerm);
    });

    const clonedTerm: any = { ...selectedTerm };
    clonedTerm.payload.symbol = value;

    // TODO: Revisar esto. El parametro modificado se actualiza bien pero luego en la siguiente linea
    // estoy mergeando este parametro a nivel raiz del array y no va.
    // Lo que tengo que hacer es buscar actualizar el array como estaba pero refrescando los cambios.
    // this.formulaTermsSubject.next([...this.formulaTermsSubject.getValue(), ...clonedTerm]);
  }

  public findChildTermDeeply(parentTerm: FormulaTerm, inputParamId: string) {
    if (!parentTerm.children) {
      return null;
    }

    const selectedTerm: FormulaTerm = parentTerm.children.find((child) => child.nodeId === inputParamId);

    if (selectedTerm) {
      return selectedTerm;
    }

    for (const child of parentTerm.children) {
      const newParent = child;

      const newSelectedTerm = this.findChildTermDeeply(newParent, inputParamId);

      if (newSelectedTerm) {
        return newSelectedTerm;
      }
    }
  }
}
