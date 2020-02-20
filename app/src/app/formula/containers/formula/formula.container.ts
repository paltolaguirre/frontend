import { FormulaParam } from './../../../core/models/formula-param.model';
import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.container.html',
  styleUrls: ['./formula.container.scss']
})
export class FormulaContainer implements OnInit, OnDestroy {

  public form: FormGroup;
  public currentFormula: Formula;
  public isItemPickerExpanded: boolean = true;
  public params: FormArray;
  public isNew: boolean = false;

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
    });
  }

  ngOnDestroy() {
  }

  public async setCurrentFormula(name: string) {
    try {
      this.currentFormula = await this.formulaService.find(name);
      console.log('current formula', this.currentFormula);

      if (!this.currentFormula) {
        return this.showNoDataDialog();
      }

      this.buildPreLoadedForm();
    } catch (e) {
      console.log(e);
      // TODO: Show an error message and log error. (Maybe go back to FormulaList).
    }
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      params: this.formBuilder.array([ this.createFormulaParam() ]),
      result: ['number', Validators.required]
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
      name: [this.currentFormula.name, [Validators.required]],
      description: [this.currentFormula.description, [Validators.required]],
      params: this.formBuilder.array([]),
      result: [this.currentFormula.result, Validators.required]
    });

    this.updateFormulaParams();
  }

  public createFormulaParam(formulaParam?: FormulaParam) {
    if (!formulaParam) {
      return this.formBuilder.group({
        name: '',
        type: '',
        functionname: ''
      });
    }

    return this.formBuilder.group({
      name: formulaParam.name,
      type: formulaParam.type,
      functionname: formulaParam.functionname
    });
  }

  public updateFormulaParams() {
    this.params = this.form.get('params') as FormArray;

    for (const param of this.currentFormula.params) {
      this.params.push(this.createFormulaParam(param));
    }
  }

  get formParams() {
    return this.form.get('params') as FormArray;
  }

  public async save() {
    console.log(this.form.value);
    console.log('is new: ', this.isNew);

    if (this.isNew) {
      return this.createFormula();
    }

    this.updateFormula();
  }

  public async createFormula() {
    try {
      await this.formulaService.create(this.form.value);
    } catch (e) {
      console.log(e);
    }
  }

  public async updateFormula() {
    try {
      await this.formulaService.update(this.form.value.name, this.form.value);
    } catch (e) {
      console.log(e);
    }
  }

  public async abort() {
    await this.router.navigate(['/formulas']);
  }

  public onItemPickerExpandedStateChanged(isExpanded: boolean) {
    this.isItemPickerExpanded = isExpanded;
  }
}
