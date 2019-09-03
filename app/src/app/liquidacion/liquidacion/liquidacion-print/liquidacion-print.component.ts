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

  totalImpRemunerativo: number;
  totalImpNoRemunerativo: number;
  totalDeducciones: number;
  totalNeto: number;

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
    this.totalImpRemunerativo = 0;
    this.totalImpNoRemunerativo = 0;
    this.totalDeducciones = 0;
    this.totalNeto = 0;

    for (let index = 0; index < 10; index++) {
      let posicionImpNoRemunerativos = index - this.liquidacion.importesremunerativos.length;
      let posicionRetenciones = index - this.liquidacion.descuentos.length;

      let item = {
        haber: {
          codigo: "",
          detalle: "",
          cantidad: "",
          remunerativo: null,
          noremunerativo: null,
        },
        deduccion: {
          codigo: "",
          detalle: "",
          cantidad: "",
          importe: null
        }
      };

      if (index < this.liquidacion.importesremunerativos.length) {
        item.haber.codigo = this.liquidacion.importesremunerativos[index].conceptoid.toString();
        item.haber.detalle = this.liquidacion.importesremunerativos[index].concepto.nombre;
        item.haber.remunerativo = this.liquidacion.importesremunerativos[index].importeunitario;
        this.totalImpRemunerativo += this.liquidacion.importesremunerativos[index].importeunitario;
      } else if (posicionImpNoRemunerativos < this.liquidacion.importesnoremunerativos.length) {
        item.haber.codigo = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].conceptoid.toString();
        item.haber.detalle = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].concepto.nombre;
        item.haber.noremunerativo = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].importeunitario;
        this.totalImpNoRemunerativo += this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].importeunitario;
      }

      if (index < this.liquidacion.descuentos.length) {
        item.deduccion.codigo = this.liquidacion.descuentos[index].conceptoid.toString();
        item.deduccion.detalle = this.liquidacion.descuentos[index].concepto.nombre;
        item.deduccion.importe = this.liquidacion.descuentos[index].importeunitario;
      } else if (posicionRetenciones < this.liquidacion.retenciones.length) {
        item.deduccion.codigo = this.liquidacion.retenciones[posicionRetenciones].conceptoid.toString();
        item.deduccion.detalle = this.liquidacion.retenciones[posicionRetenciones].concepto.nombre;
        item.deduccion.importe = this.liquidacion.retenciones[posicionRetenciones].importeunitario;
      }
      this.totalDeducciones += item.deduccion.importe;
      
      this.items.push(item);
    }

    this.totalNeto = this.totalImpRemunerativo + this.totalImpNoRemunerativo - this.totalDeducciones
  }
}
