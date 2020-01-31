import { Formula } from '../../../core/models/formula.model';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

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
    private formulaService: FormulaService
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

      this.buildPreLoadedForm();
    } catch (e) {
      console.log(e);
    }
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  public buildPreLoadedForm() {
    this.form = this.formBuilder.group({
      name: [this.currentFormula.name, [Validators.required]],
      description: [this.currentFormula.description, [Validators.required]]
    });
  }
}
