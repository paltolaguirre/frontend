import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-formula-clone-dialog',
  templateUrl: './formula-clone-dialog.component.html',
  styleUrls: ['./formula-clone-dialog.component.scss']
})
export class FormulaCloneDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormulaCloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ...this.data.formula,
      name: this.data.formula.name + ' (1)'
    });
  }

  public apply() {
    const clonedFormula = {...this.data.formula};

    clonedFormula.name = this.form.value.name;
    clonedFormula.description = this.form.value.description;
    clonedFormula.valueid = null;

    this.dialogRef.close(clonedFormula);
  }

}
