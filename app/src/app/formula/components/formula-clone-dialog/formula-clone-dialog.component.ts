import { Formula } from './../../../core/models/formula.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-formula-clone-dialog',
  templateUrl: './formula-clone-dialog.component.html',
  styleUrls: ['./formula-clone-dialog.component.scss']
})
export class FormulaCloneDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormulaCloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
