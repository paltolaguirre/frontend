import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formula-create',
  templateUrl: './formula-create.container.html',
  styleUrls: ['./formula-create.container.scss']
})
export class FormulaCreateContainer implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildEmptyForm();
  }

  ngOnInit() {
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
