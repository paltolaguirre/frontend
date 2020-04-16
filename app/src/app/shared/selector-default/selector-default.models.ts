import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Models {
    
  public valor(nombre) : any {
      switch (nombre) { 
          case 'condicionpago': 
          // TODO: Se debe llamar al helper de liquidacioncondicionpago
            return [{nombre: 'Contado', ID: 1},{nombre: 'Cuenta Corriente', ID: 2}]; 
          case 'tipo': 
          // TODO: Se debe llamar al helper de liquidaciontipo
            return [{nombre: 'Mensual', codigo: 'Mensual',ID: 1},{nombre: 'Primer Quincena', ID: 2},{nombre: 'Segunda Quincena', ID: 3},{nombre: 'Vacaciones', ID: 4},{nombre: 'SAC', ID: 5},{nombre: 'Liquidacion Final', ID: 6}]; 
          case 'liquidacion-novedades': 
            return [{nombre: 'Descuentos', ID: -1},{nombre: 'Retenciones', ID: -2},{nombre: 'Importes Remunerativos', ID: -3},{nombre: 'Importes No Remunerativos', ID: -4},{nombre: 'Aportes Patronales', ID: -5}]; 
          case 'mes': 
            return [{nombre: 'Enero', ID: 0},{nombre: 'Febrero', ID: 1},{nombre: 'Marzo', ID: 2},
                    {nombre: 'Abril', ID: 3},{nombre: 'Mayo', ID: 4},{nombre: 'Junio', ID: 5},
                    {nombre: 'Julio', ID: 6},{nombre: 'Agosto', ID: 7},{nombre: 'Septiembre', ID: 8},
                    {nombre: 'Octubre', ID: 9},{nombre: 'Noviembre', ID: 10},{nombre: 'Diciembre', ID: 11}];
          case 'si/no': 
            return [{nombre: 'Si', ID: 1},{nombre: 'No', ID: 0}];
            case 'tipopresentacion': 
              return [{nombre: 'Anual', ID: 1},{nombre: 'Final', ID: 2}]; 
          default: 
          return []; 
      } 
  }
  async setPlaceHolder(nombre: string) : Promise<string> {
    switch (nombre) { 
      case 'condicionpago': 
        return "Condicion de Pago"; 
      case 'localidad': 
        return "Localidad"; 
      case 'provincia': 
        return "Provincia"; 
      case 'pais': 
        return "País"; 
      case 'modalidadcontratacion': 
        return "Modalidad de contratación"; 
      case 'situacion': 
        return "Situación"; 
      case 'condicion': 
        return "Condición"; 
      case 'condicionsiniestrado': 
        return "Condición siniestrado"; 
      case 'obrasocial': 
        return "Obra social"; 
      case 'conveniocolectivo': 
        return "Convenio colectivo"; 
      case 'legajo': 
          return "Legajo"; 
      case 'concepto': 
          return "Concepto"; 
      case 'centrodecosto': 
        return "Centro de costo"; 
      case 'cuenta': 
        return "Cuenta Contable"; 
      case 'tipo': 
         return "Tipo"; 
      case 'mes': 
         return "Mes"; 
      case 'anio': 
         return "Año";
      case 'tipoconcepto':
          return "Tipo de Concepto";
      case 'tipodecalculo':
        return "Tipo de Calculo";
      case 'tipoimpuestosganancias':
        return "Impuesto a las Ganancias";
      case 'siradigtipoimpuesto':
        return "Tipo de Impuesto";
      case 'tipopresentacion':
        return "Tipo de Presentación"
      default: 
        return "Seleccione..."; 
    } 
  }

}
