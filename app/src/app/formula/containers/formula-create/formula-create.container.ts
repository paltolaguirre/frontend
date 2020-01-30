import { Formula } from './../../../core/models/formula.model';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { pluck, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-formula-create',
  templateUrl: './formula-create.container.html',
  styleUrls: ['./formula-create.container.scss']
})
export class FormulaCreateContainer implements OnInit, OnDestroy {

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
          console.log('NO ID');
          return this.currentFormula = null;
        }

        console.log('ID GIVEN: ', id);
        this.currentFormula = this.formulaService.find(id);
    });
  }

  ngOnDestroy() {
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
