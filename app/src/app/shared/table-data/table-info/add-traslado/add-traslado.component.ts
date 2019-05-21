import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  conductor: string;
  fecha: string;
  tipo: string;
}

@Component({
  selector: 'app-add-traslado',
  templateUrl: './add-traslado.component.html',
  styleUrls: ['./add-traslado.component.scss'],
})
export class AddTrasladoComponent {

  conductor: string;
  fecha: string;
  tipo: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTrasladoDialog, {
      width: '875px',
      height: '315px',
      data: {conductor: this.conductor, fecha: this.fecha, tipo: this.tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.conductor = result;
    });
  }
}

@Component({
  selector: 'add-traslado-dialog',
  templateUrl: 'add-traslado-dialog.component.html',
  styleUrls: ['./add-traslado.component.scss'],
})
export class AddTrasladoDialog {

  constructor(
    public dialogRef: MatDialogRef<AddTrasladoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
