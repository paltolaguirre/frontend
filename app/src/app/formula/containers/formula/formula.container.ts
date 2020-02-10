import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      pluck('id')).subscribe(id => {
        if (!id) {
          this.currentFormula = null;

          return this.buildEmptyForm();
        }

        this.setCurrentFormula(Number(id));
    });
  }

  ngOnDestroy() {
  }

  public setCurrentFormula(id: number) {
    try {
      this.currentFormula = this.formulaService.find(id);

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
      inputParamDataType: [''],
      inputParamName: [''],
      outParamDataType: ['Numérico', Validators.required]
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
      inputParamDataType: [this.currentFormula.inputParamDataType],
      inputParamName: [this.currentFormula.inputParamName],
      outParamDataType: [this.currentFormula.outParamDataType, Validators.required]
    });
  }

  public save() {
    console.log(this.form.value);
    // TODO save.
  }

  public async abort() {
    await this.router.navigate(['/formulas']);
  }
}
