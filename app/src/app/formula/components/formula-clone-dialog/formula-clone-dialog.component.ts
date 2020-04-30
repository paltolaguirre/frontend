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

    clonedFormula.valueid = 0;
    clonedFormula.value.ID = 0;
    clonedFormula.value.valueinvoke.ID = 0;
    clonedFormula.value.valueinvokeid = 0;
    clonedFormula.valueinvokeid = 0;

    this.setToZeroArgIds(clonedFormula.value.valueinvoke);

    this.dialogRef.close(clonedFormula);
  }

  private setToZeroArgIds(valueinvoke) {
    const args = valueinvoke.args;

    if (!args) {
      return null;
    }

    for (const arg of args) {
      arg.ID = 0;

      if (arg.valueinvoke) {
        arg.valueinvoke.ID = 0;
        arg.valueinvokeid = 0;

        this.setToZeroArgIds(arg.valueinvoke);
      }
    }
  }

}
