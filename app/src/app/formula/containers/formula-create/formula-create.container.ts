import { Formula } from './../../../core/models/formula.model';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { switchMap, pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-formula-create',
  templateUrl: './formula-create.container.html',
  styleUrls: ['./formula-create.container.scss']
})
export class FormulaCreateContainer implements OnInit, OnDestroy {

  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
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
      takeUntil(this.destroyed$),
      pluck('id')).subscribe(id => {
        if (!id) {
          console.log('NO ID');
          return this.currentFormula = null;
        }

        console.log('ID GIVEN: ', id);
        this.currentFormula = this.formulaService.find(id);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
