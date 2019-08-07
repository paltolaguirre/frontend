import { Component, OnInit, Input } from '@angular/core';
import { Source } from 'webpack-sources';
import { Liquidacion } from '../../liquidacion.model';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { Empresa } from 'src/app/empresa/empresa.model';
import { Observable } from 'rxjs';

export interface LiquidacionItem {
  haber: {
    codigo: string;
    detalle: string;
    cantidad: string;
    remunerativo: string;
    noremunerativo: string;
  },
  deduccion: {
    codigo: string;
    detalle: string;
    cantidad: string;
    importe: string;
  }
}

@Component({
  selector: 'app-liquidacion-print',
  templateUrl: './liquidacion-print.component.html',
  styleUrls: ['./liquidacion-print.component.css']
})

export class LiquidacionPrintComponent implements OnInit {
  @Input() liquidacion: Liquidacion;
  empresa: Empresa;
  items: Array<LiquidacionItem>;

  constructor(private empresaService: EmpresaService,) { 
    this.items = new Array();
  }

  async ngOnInit() {
    this.empresa = await this.empresaService.getEmpresa();
    console.log(this.empresa);

    this.obtenerItems();
  }

  obtenerDni() {
    return this.liquidacion.legajo.cuil.slice(2, this.liquidacion.legajo.cuil.length-1);
  }

  calcularImporteTotal() {
    return 1000;
  }

  obtenerItems() {
    for (let index = 0; index < 10; index++) {
      this.items.push({
        haber: {
          codigo: "",
          detalle: "",
          cantidad: "",
          remunerativo: "",
          noremunerativo: "",
        },
        deduccion: {
          codigo: "",
          detalle: "",
          cantidad: "",
          importe: ""
        }
      });
    }
  }
}
