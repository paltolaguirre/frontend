import { Component, OnInit, Input } from '@angular/core';
import { Source } from 'webpack-sources';
import { Liquidacion, Liquidacionitem } from '../../liquidacion.model';
import { EmpresaService } from 'src/app/empresa/empresa.service';
import { Empresa } from 'src/app/empresa/empresa.model';
import { Observable } from 'rxjs';
import { SelectorService } from 'src/app/shared/selector-default/selector-default.service';
import { TIPO_CONCEPTO_CODIGO, Concepto } from 'src/app/concepto/concepto.model';
import { NumeroaletrasService } from 'src/app/shared/services/numeroaletras.service';

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
  totalNetoLetras: String;

  logobase64: String;

  constructor(private empresaService: EmpresaService, private selectorService: SelectorService, public numeroaletrasService: NumeroaletrasService) { 
    this.items = new Array();
  }

  async ngOnInit() {
    this.obtenerArraysImportes();

    this.empresa = await this.empresaService.getEmpresa();
    const bancos = await this.selectorService.getSelector("banco" , null);
    let banco;
    const bancoaportejubilatorioid = this.liquidacion.bancoaportejubilatorioid;
    if(bancos && bancoaportejubilatorioid!=0) {
      banco = bancos.filter((banco)=>{
        return banco.ID == bancoaportejubilatorioid
      })[0];
      console.log("Banco Aporte Jubilatorio: ", banco);
    } else {
      banco = {id:0, nombre: "-"};
    }

    this.liquidacion.bancoaportejubilatorio = {
      ID: banco.id,
      codigo: banco.nombre,
      descripcion: banco.nombre,
    };

    console.log(this.empresa);
    this.obtenerItems();
  }

  obtenerDni() {
    return this.liquidacion.legajo.cuil.slice(2, this.liquidacion.legajo.cuil.length-1);
  }

  calcularImporteTotal() {
    return 1000;
  }

  async obtenerItems() {
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
        item.haber.codigo = this.obtenerConceptoCodigo(this.liquidacion.importesremunerativos[index].concepto);
        item.haber.detalle = this.liquidacion.importesremunerativos[index].concepto.nombre;
        item.haber.remunerativo = this.liquidacion.importesremunerativos[index].importeunitario;
        item.haber.cantidad = this.liquidacion.importesremunerativos[index].cantidad.toString();
        this.totalImpRemunerativo += this.liquidacion.importesremunerativos[index].importeunitario;
      } else if (posicionImpNoRemunerativos < this.liquidacion.importesnoremunerativos.length) {
        item.haber.codigo = this.obtenerConceptoCodigo(this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].concepto);
        item.haber.detalle = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].concepto.nombre;
        item.haber.noremunerativo = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].importeunitario;
        item.haber.cantidad = this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].cantidad.toString();
        this.totalImpNoRemunerativo += this.liquidacion.importesnoremunerativos[posicionImpNoRemunerativos].importeunitario;
      }

      if (index < this.liquidacion.descuentos.length) {
        item.deduccion.codigo = this.obtenerConceptoCodigo(this.liquidacion.descuentos[index].concepto);
        item.deduccion.detalle = this.liquidacion.descuentos[index].concepto.nombre;
        item.deduccion.importe = this.liquidacion.descuentos[index].importeunitario;
        item.deduccion.cantidad = this.liquidacion.descuentos[index].cantidad.toString();
      } else if (posicionRetenciones < this.liquidacion.retenciones.length) {
        item.deduccion.codigo = this.obtenerConceptoCodigo(this.liquidacion.retenciones[posicionRetenciones].concepto);
        item.deduccion.detalle = this.liquidacion.retenciones[posicionRetenciones].concepto.nombre;
        item.deduccion.importe = this.liquidacion.retenciones[posicionRetenciones].importeunitario;
        item.deduccion.cantidad = this.liquidacion.retenciones[posicionRetenciones].cantidad.toString();
      }
      this.totalDeducciones += item.deduccion.importe;
      
      this.items.push(item);
    }

    this.totalNeto = this.totalImpRemunerativo + this.totalImpNoRemunerativo - this.totalDeducciones;
    this.totalNetoLetras = await this.obtenerEnLetras(this.totalNeto);
  }

  obtenerConceptoCodigo(concepto: Concepto): string {
    if (concepto.ID > 0 && concepto.codigo != ''){
        return concepto.codigo.substr(0, 4);
    }     
    return concepto.codigointerno.toString();

  }

  obtenerArraysImportes() {
    this.liquidacion.importesremunerativos = this.liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.REMUNERATIVO);
    this.liquidacion.importesnoremunerativos = this.liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.NO_REMUNERATIVO);
    this.liquidacion.descuentos = this.liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.DESCUENTO);
    this.liquidacion.retenciones = this.liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.RETENCION);
    this.liquidacion.aportespatronales = this.liquidacion.liquidacionitems.filter((item: Liquidacionitem) => item.concepto.tipoconcepto.codigo == TIPO_CONCEPTO_CODIGO.APORTE_PATRONAL);
  }

  async obtenerEnLetras(numero: Number){

    const respuesta = await this.numeroaletrasService.numeroALetras(numero)
    return respuesta.toLowerCase();
  }
}
