import { FormulaParam } from './../../../core/models/formula-param.model';
import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
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
  public currentCanvasFormulas: any = [];
  public oldFormulaName: string;
  public isItemPickerExpanded: boolean = true;
  public params: FormArray;
  public isNew: boolean = false;
  public isEditable: boolean = true;
  public formulas: Formula[];
  public typesOptions = [
    {
      name: 'Numérico',
      value: 'number'
    },
    {
      name: 'Booleano',
      value: 'boolean'
    }
  ];

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
          this.currentFormula = this.form.value;

          return this.buildEmptyForm();
        }

        this.setCurrentFormula(name);
        this.fetchFormulas();

        this.currentCanvasFormulas.push(this.currentFormula);
      });
  }

  ngOnDestroy() {
  }

  public async setCurrentFormula(name: string) {
    this.currentFormula = await this.formulaService.find(name);

    if (!this.currentFormula) {
      return this.showNoDataDialog();
    }

    this.oldFormulaName = this.currentFormula.name;
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
          ID: 0,
          name: '',
          type: 'number',
          valuenumber: 0,
          valuestring: '',
          Valueboolean: false,
          valueinvoke: null,
          valueinvokeid: null,
          arginvokeid: 0
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

  public createFormulaParam(formulaParam: FormulaParam) {
    return this.formBuilder.group({...formulaParam});
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
    if (this.validateCanvasFormulas()) {
      this.currentFormula.value = this.currentCanvasFormulas.filter(formula => formula.valueinvoke != null)[0];
      this.currentFormula.name = this.form.get('name').value;
      this.currentFormula.description = this.form.get('description').value;
      console.log("Current Formula: ", this.currentFormula)

      if (this.isNew) {
        return this.createFormula();
      }

      this.updateFormula();
    }
  }

  public validateCanvasFormulas() {
    const formulas = this.currentCanvasFormulas.filter(formula => formula.valueinvoke != null);

    if(formulas.length != 1) {
      return false;
    }

    return true;
  }

  public async createFormula() {
    await this.formulaService.create(this.currentFormula);

    return this.goToFormulasList();
  }

  public async updateFormula() {
    await this.formulaService.update(this.oldFormulaName, this.currentFormula);

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

    const num = this.currentFormula.params.length + 1;
    const param: FormulaParam = {
      ID: 0,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      name: 'val' + num,
      type: 'number'
    };

    this.currentFormula.params.push(param);
    this.currentFormula = {...this.currentFormula};

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
