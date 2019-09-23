import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogLiquidaciones } from '../../liquidacion/liquidacion-dialog/liquidacion-dialog.component';
import { LiquidacionDefaultValues, DuplicarLiquidaciones } from '../../liquidacion.model';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { LiquidacionService } from '../../liquidacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duplicar-dialog',
  templateUrl: './duplicar-dialog.component.html',
  styleUrls: ['./duplicar-dialog.component.css']
})
export class DuplicarDialogComponent implements OnInit {
  liquidacion: any;
  response: any;
  toggle = true;

  duplicadosCorrecto: number;
  duplicadosError: number;
  
  constructor(
    public dialogRef: MatDialogRef<DialogLiquidaciones>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private liquidacionService: LiquidacionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.liquidacion = {
      tipo: null,
      fecha: null,
      fechaultimodepositoaportejubilatorio: null,
      fechaperiododepositado: null,
      fechaperiodoliquidacion: null
    }
    
    console.log("data: ", this.data);

    if(this.legajosRepetidosEnLiquidaciones()) {
      this.dialogRef.close();
    }

  }

  async onClickDuplicar(): Promise<void> {
    if(this.faltanRequeridos()) return null;
    if(this.mismoPeriodoLiquidacion(this.liquidacion.fechaperiodoliquidacion)) return null;

    const liquidacion: LiquidacionDefaultValues = {
      tipoid: parseInt(this.liquidacion.tipo, 10),
      fecha: new Date(this.liquidacion.fecha+"T03:00:00.000Z").toISOString(),
      fechaultimodepositoaportejubilatorio: new Date(this.liquidacion.fechaultimodepositoaportejubilatorio+"T03:00:00.000Z").toISOString(),
      fechaperiododepositado: new Date(this.liquidacion.fechaperiododepositado+"T03:00:00.000Z").toISOString(),
      fechaperiodoliquidacion: new Date(this.liquidacion.fechaperiodoliquidacion+"T03:00:00.000Z").toISOString()
    }

    const idsLiquidaciones: number[] = Array();
    this.data.forEach(element => {
      idsLiquidaciones.push(parseInt(element.ID,10));
    });

    const duplicarLiquidaciones: DuplicarLiquidaciones = {
      liquidaciondefaultvalues: liquidacion,
      idstoreplicate: idsLiquidaciones
    }

    console.log("Duplicando Liquidaciones");
    this.response = await this.liquidacionService.postDuplicarLiquidaciones(duplicarLiquidaciones);

    console.log("Resultado Duplicar Liquidaciones: ", this.response);
    
    this.duplicados_correcto();
    this.duplicados_error();
    this.toggle = !this.toggle;
  }

  onNoClick(): void {
    const result = {
      "refresh": (this.duplicadosCorrecto > 0)
    };

    this.dialogRef.close(result);
  }

  duplicados_correcto(): void {
    let count = 0
    
    if(this.response) {
      this.response.result.forEach(element => {
        if(element.tipo == "SUCCESS") count++;
      });
    }
    this.duplicadosCorrecto = count;
  }

  duplicados_error(): void {
    let count = 0
    
    if(this.response) {
      this.response.result.forEach(element => {
        if(element.tipo == "ERROR") count++;
      });
    }
    this.duplicadosError = count;
  }

  faltanRequeridos(): boolean {
    var todos = document.getElementsByTagName('*');
    var requeridos = new Array();
    for (let obj of todos as any) {
      if (obj.required && obj.value == "") {
        // requeridos.push(obj);
        let placeholder = obj.getAttribute("placeholder");
        const notificacion = {
          codigo: 400,
          mensaje: `El campo "${placeholder}" es obligatorio.`
        }
        const ret = this.notificationService.notify(notificacion);
        return true;
      }
    }
    return false;
  }

  legajosRepetidosEnLiquidaciones(): boolean {
    var hash = {};
    var sinRepetidos = this.data.filter(function(current) {
      var exists = !hash[current.legajoid] || false;
      hash[current.legajoid] = true;
      return exists;
    });

    const result = this.data.length != sinRepetidos.length;
    if(result) {
      const notificacion = {
        codigo: 400,
        mensaje: `Unicamente se podrá seleccionar una liquidación por legajo.`
      }
      const ret = this.notificationService.notify(notificacion);
    }
    
    return result;
  }

  mismoPeriodoLiquidacion(periodoSeleccionado): boolean {
    let mismoPeriodo = this.data.filter(function(current) {
      return current.fechaperiodoliquidacion.substring(0, 7) == periodoSeleccionado;
    });

    let result = mismoPeriodo.length > 0;
    if(result) {
      const notificacion = {
        codigo: 400,
        mensaje: `El período de liquidación ingresado no debe coincidir con el período de ninguna de las liquidaciones seleccionadas.`
      }
      const ret = this.notificationService.notify(notificacion);
    }

    return result;
  }
}
