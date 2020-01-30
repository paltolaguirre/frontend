import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formula-edit',
  templateUrl: './formula-edit.container.html',
  styleUrls: ['./formula-edit.container.scss']
})
export class FormulaEditContainer implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildEmptyForm();
  }

  private buildEmptyForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
