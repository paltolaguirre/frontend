import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'encabezado-dialog.component',
  templateUrl: 'encabezado-dialog.component.html',
  styleUrls: ['encabezado-dialog.component.css']
})
export class DialogEncabezado {
 
  isLoadingResults = true;
  
  hojadesde: number;
  hojahasta: number;

  constructor(
    public dialogRef: MatDialogRef<DialogEncabezado>,
    private router: Router
  ) { }

  async ngOnInit() {
    this.hojadesde = 1;
    this.hojahasta = 1;
  }
  
  async ngAfterViewInit() {

  }

  onClickImprimir(): void {
    this.router.navigate(['/informes/libro-sueldos/imprimir/encabezado'], {queryParams:{hojadesde: this.hojadesde, hojahasta: this.hojahasta}});
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}