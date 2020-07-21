import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems , NovedadService } from 'src/app/novedad/novedad.service';
import { TIPO_CONCEPTO, Concepto } from 'src/app/concepto/concepto.model';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


interface Option {
  name: string;
  url: string;
}

@Component({
  selector: 'liquidacion-list-dialog.component',
  templateUrl: 'liquidacion-list-dialog.component.html',
  styleUrls: ['./liquidacion-list-dialog.component.css']
})

export class LiquidacionListDialog {
  isLoadingResults = true;
  optionControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  options: Option[] = [
    {name: 'Imprimir en una hoja', url: '/liquidaciones/imprimir'},
    {name: 'Imprimir en dos hojas', url: '/liquidaciones/imprimircompleto'},
  ];
  ids = [];
  
  constructor(
    public dialogRef: MatDialogRef<LiquidacionListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.optionControl.setValue(this.options[0]);

    this.data.forEach((e)=>{this.ids.push(e.ID);})
  }
  
  async ngAfterViewInit() {

  }

  onClickAceptar(): void {
    const fullPath = `${this.optionControl.value.url}?ids=${this.ids}`
    this.router.navigateByUrl(fullPath);

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}