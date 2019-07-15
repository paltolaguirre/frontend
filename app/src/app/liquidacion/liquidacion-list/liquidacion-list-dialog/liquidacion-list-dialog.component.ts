import { ListaItems, LiquidacionService } from '../../liquidacion.service';
import { Component, ViewChild, AfterViewInit, OnInit , Inject } from '@angular/core';
import { formatDate } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Fechaliquidaciones } from '../../liquidacion.model';

@Component({
    selector: 'liquidacion-list-dialog.component',
    templateUrl: 'liquidacion-list-dialog.component.html',
    styleUrls: ['./liquidacion-list-dialog.component.css']
  })
  export class DialogLiquidacionesList {
   
    fecha : Date;

    constructor(
      public dialogRef: MatDialogRef<DialogLiquidacionesList>,
      private liquidacionService: LiquidacionService,
      @Inject(MAT_DIALOG_DATA) public data: any) { 
        
      }
  
      onClickContabilizar(): void {
        this.contabilizar();
        this.dialogRef.close();        
      }
      onNoClick(): void {
        this.dialogRef.close();        
      }
  
      public async contabilizar () {
        const fechaliquidacion : Fechaliquidaciones = {fechaliquidaciones:formatDate(this.fecha, "yyyy-MM-dd'T'12:00:00.000000-12:00", 'en-US')};
        const liquidacionesContablesApi: any = await this.liquidacionService.postContabilizarLiquidacion(fechaliquidacion);    

        if (liquidacionesContablesApi.Error) {
          
        }
      }


    async ngOnInit() {
        
    }
    async ngAfterViewInit() {
  
    }
  
  }