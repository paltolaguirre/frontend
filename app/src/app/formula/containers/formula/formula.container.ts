import { FormulaParam } from './../../../core/models/formula-param.model';
import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import { Location } from '@angular/common';
import { FormulaTerm } from 'src/app/core/models/formula-term.model';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.container.html',
  styleUrls: ['./formula.container.scss']
})
export class FormulaContainer implements OnInit, OnDestroy {

  public form: FormGroup;
  public currentFormula: Formula;
  public oldFormulaName: string;
  public isItemPickerExpanded: boolean = true;
  public params: FormArray;
  public isNew: boolean = false;
  public isEditable: boolean = true;
  public formulas: Formula[];
  public typesOptions = [
    {
      name: "Numérico",
      value: 'number'
    },
    {
      name: "Booleano",
      value: 'boolean'
    }
  ];

  public formulaResultExample =
  {
    nodeId: 'formula-term-math-basic-operator-1',
    payload: {
      nodeId: 'math-basic-operator-1',
      payload: { id: 1, operationName: 0, type: 0, symbol: '+', mustRemoveFromSource: false, category: 0, hasChildren: true }
    },
    children: [
      {
        nodeId: '23',
        payload: {
          nodeId: 'math-basic-operator-1',
          payload: {
            id: 1,
            operationName: 0,
            type: 0,
            symbol: '+',
            mustRemoveFromSource: false,
            category: 0,
            hasChildren: true
          }
        },
        children: [
          {
            nodeId: 'child-param-4',
            payload: {
              nodeId: 'child-param-4',
              payload: '11',
              children: null
            },
            children: []
          },
          {
            nodeId: 'child-param-6',
            payload: {
              nodeId: 'child-param-6',
              payload: '12',
              children: null
            },
            children: []
          }
        ]
      },
      {
        nodeId: '24',
        payload: {
          nodeId: 'math-basic-operator-1',
          payload: { id: 1, operationName: 0, type: 0, symbol: '+', mustRemoveFromSource: false, category: 0, hasChildren: true }
        },
        children: [
          {
            nodeId: 'child-param-12',
            payload: {
              nodeId: 'child-param-12',
              payload: '21',
              children: null
            }, children: []
          },
          {
            nodeId: 'child-param-14',
            payload: { nodeId: 'child-param-14', payload: '22', children: null },
            children: []
          }
        ]
      }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private formulaService: FormulaService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.buildEmptyForm();
  }

  async ngOnInit() {
    this.route.params.pipe(
      takeUntil(componentDestroyed(this)),
      pluck('name')).subscribe(name => {
        if (!name) {
          this.isNew = true;
          this.currentFormula = null;

          return this.buildEmptyForm();
        }

        this.setCurrentFormula(name);
        this.fetchFormulas();
    });
  }

  ngOnDestroy() {
  }

  public async setCurrentFormula(name: string) {
    this.currentFormula = await this.formulaService.find(name);
    this.oldFormulaName = this.currentFormula.name;

    console.log(this.currentFormula);

    if (!this.currentFormula) {
      return this.showNoDataDialog();
    }

    this.isEditable = this.formulaService.isEditable(this.currentFormula);

    // TODO: Set actual formulaResult.

    this.buildPreLoadedForm();
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      origin: ['custom'],
      type: ['generic'],
      scope: ['private'],
      params: this.formBuilder.array([]),
      result: ['number', Validators.required],
      value: {
        valueinvoke: null
      },
      formulaResult: []
    });
  }

  public fetchFormulas() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.formulas = formulas;
    });
  }

  public showNoDataDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '250px',
      data: {
        title: 'Hubo un problema',
        text: 'No se pudieron cargar los datos de la fórmula, por favor intente nuevamente.'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe(() => {
      this.location.back();
    });
  }

  public buildPreLoadedForm() {
    this.form = this.formBuilder.group({
      ...this.currentFormula,
      params: this.formBuilder.array([]),
      formulaResult: []
    });

    this.updateFormulaParams();
  }

  public createFormulaParam(formulaParam?: FormulaParam) {
    if (!formulaParam) {
      return this.formBuilder.group({
        name: '',
        type: 'number'
      });
    }

    return this.formBuilder.group({
      ...formulaParam
    });
  }

  public updateFormulaParams() {
    for (const param of this.currentFormula.params) {
      this.formParams.push(this.createFormulaParam(param));
    }
  }

  get formParams() {
    return this.form.get('params') as FormArray;
  }

  public async save() {
    console.log("Current Formula: ", this.currentFormula)
    if (this.isNew) {
      return this.createFormula();
    }

    this.updateFormula();
  }

  public async createFormula() {
    await this.formulaService.create(this.form.value);

    return this.goToFormulasList();
  }

  public async updateFormula() {
    await this.formulaService.update(this.oldFormulaName, this.form.value);

    return this.goToFormulasList();
  }

  public onCancelClick() {
    this.goToFormulasList();
  }

  public async goToFormulasList() {
    await this.router.navigate(['/formulas']);
  }

  public onItemPickerExpandedStateChanged(isExpanded: boolean) {
    this.isItemPickerExpanded = isExpanded;
  }

  public onAddInputParamClick(event) {
    event.preventDefault();

    const num = this.currentFormula.params.length+1;
    let param = {
      ID: 0,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      name: 'val'+num,
      type: 'number'
    };

    this.currentFormula.params.push(param);
    this.currentFormula = Object.assign({}, this.currentFormula)
    this.formParams.push(this.createFormulaParam(param));

  }

  public onDeleteInputParam(event, rowIndex: number) {
    event.preventDefault();

    this.formParams.value[rowIndex].DeletedAt = new Date();
  }

  public isFormulaParamAvailable(param: FormControl): boolean {
    return !param.value.DeletedAt;
  }

  public updateFormulaResult(formulaResult: FormulaTerm) {
    this.form.patchValue({ formulaResult });
    console.log(this.form.value);
    // console.log(JSON.stringify(this.form.value)); //SUM(SUM(11,12),SUM(21,22))
    // console.log('formulaResult: ', JSON.stringify(this.form.value.formulaResult));
  }
}
