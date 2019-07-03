import { ListaItems, LiquidacionService } from '../../liquidacion.service';
import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'liquidacion-list-dialog.component',
    templateUrl: 'liquidacion-list-dialog.component.html',
    styleUrls: ['./liquidacion-list-dialog.component.css']
  })
  export class DialogLiquidacionesList {
   
    constructor(
      public dialogRef: MatDialogRef<DialogLiquidacionesList>,
      private novedadService: LiquidacionService,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
      onClickAgregar(): void {
        this.contabilizar(this.data);
        this.dialogRef.close();        
      }
      onNoClick(): void {
        this.dialogRef.close();        
      }
  
      public contabilizar (data) {
        
      }

    async ngOnInit() {
        
    }
    async ngAfterViewInit() {
  
    }
  
  }