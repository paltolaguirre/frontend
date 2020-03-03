import { FormulaParam } from './../../../core/models/formula-param.model';
import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Directive, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, NgControl } from '@angular/forms';
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
  public isEditable: boolean = true;

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
    this.currentFormula = await this.formulaService.find(name);
    console.log('current formula', this.currentFormula);

    if (!this.currentFormula) {
      return this.showNoDataDialog();
    }

    this.isEditable = this.formulaService.isEditable(this.currentFormula);

    this.buildPreLoadedForm();
  }

  // TODO: Build with all required params. Create dates on iso string format.
  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      origin: ['custom'],
      type: ['generic'],
      scope: ['private'],
      params: this.formBuilder.array([ this.createFormulaParam() ]),
      result: ['number', Validators.required],
      value: {
        valueinvoke: null
      }
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
      params: this.formBuilder.array([])
    });

    this.updateFormulaParams();
  }

  public createFormulaParam(formulaParam?: FormulaParam) {
    if (!formulaParam) {
      return this.formBuilder.group({
        name: 'val1',
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

    console.log('Updated formula', this.form.value);
  }

  get formParams() {
    return this.form.get('params') as FormArray;
  }

  public async save() {
    console.log('Formula that will be saved: ', this.form.value);
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
    await this.formulaService.update(this.form.value.name, this.form.value);

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

    this.formParams.push(this.createFormulaParam());
  }

  public onDeleteInputParam(event, rowIndex: number) {
    event.preventDefault();

    this.formParams.value[rowIndex].DeletedAt = new Date();
  }

  public isFormulaParamAvailable(param: FormControl): boolean {
    return !param.value.DeletedAt;
  }
}