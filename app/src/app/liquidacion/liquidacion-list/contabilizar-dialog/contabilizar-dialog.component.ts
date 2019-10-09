import { Component, OnInit, Inject } from '@angular/core';
import { DialogLiquidaciones } from '../../liquidacion/liquidacion-dialog/liquidacion-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { LiquidacionService } from '../../liquidacion.service';
import { Contabilizar } from '../../liquidacion.model';

@Component({
  selector: 'app-contabilizar-dialog',
  templateUrl: './contabilizar-dialog.component.html',
  styleUrls: ['./contabilizar-dialog.component.css']
})
export class ContabilizarDialogComponent implements OnInit {
  contabilizacion: Contabilizar;
  response: any;
  toggle = true;

  cantidadCorrecto: number;
  cantidadError: number;

  constructor(
    public dialogRef: MatDialogRef<ContabilizarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private liquidacionService: LiquidacionService,
  ) { }

  ngOnInit() {
    this.contabilizacion = {
      idsliquidacionesacontabilizar: [],
      descripcion: "Asiento de Sueldos",
      fechaasiento: new Date().toString()
    }

    console.log("data: ", this.data);
  }

  async onClickContabilizar(): Promise<void> {
    if(this.faltanRequeridos()) return null;

    this.data.forEach(function (el) {
      if (el.checked == true) {
        this.contabilizacion.idsliquidacionesacontabilizar.push(el.ID)
      };
    }, this);

    console.log("Contabilizando Liquidaciones");
    let response = await this.liquidacionService.postContabilizarLiquidacion(this.contabilizacion);

    console.log("Resultado Contabilizar Liquidaciones: ", response);

    this.response = response;
    // RESPONSE: {codigo: 200, respuesta: "Se contabilizaron correctamente 1 liquidaciones"}
    /*this.cantidadCorrecto = this.contar_correcto();
    this.cantidadError = this.contar_error();*/
    this.toggle = !this.toggle;
  }

  onNoClick(): void {
    const result = {
      //"refresh": (this.cantidadCorrecto > 0)
      "refresh": 1
    };

    this.dialogRef.close(result);
  }

  contar_correcto(): number {
    let count = 0
    
    if(this.response) {
      this.response.result.forEach(element => {
        if(element.tipo == "SUCCESS") count++;
      });
    }

    return count;
  }

  contar_error(): number {
    let count = 0
    
    if(this.response) {
      this.response.result.forEach(element => {
        if(element.tipo == "ERROR") count++;
      });
    }
    
    return count;
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
}
