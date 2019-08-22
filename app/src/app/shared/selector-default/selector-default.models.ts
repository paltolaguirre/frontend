import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Models {
    
  public valor(nombre) : any {
      switch (nombre) { 
          case 'condicionpago': 
            return [{nombre: 'Contado', id: 1},{nombre: 'Cuenta Corriente', id: 2}]; 
          case 'tipo': 
            return [{nombre: 'Mensual', codigo: 'Mensual',id: 1},{nombre: 'Primer Quincena', id: 2},{nombre: 'Segunda Quincena', id: 3},{nombre: 'Vacaciones', id: 4},{nombre: 'SAC', id: 5},{nombre: 'Liquidacion Final', id: 6}]; 
          case 'liquidacion-novedades': 
            return [{nombre: 'Descuentos', id: 1},{nombre: 'Retenciones', id: 2},{nombre: 'Importes Remunerativos', id: 3},{nombre: 'Importes No Remunerativos', id: 4},{nombre: 'Aportes Patronales', id: 5}]; 
          case 'mes': 
            return [{nombre: 'Enero', id: 1},{nombre: 'Febrero', id: 2},{nombre: 'Marzo', id: 3},
                    {nombre: 'Abril', id: 4},{nombre: 'Mayo', id: 5},{nombre: 'Junio', id: 6},
                    {nombre: 'Julio', id: 7},{nombre: 'Agosto', id: 8},{nombre: 'Septiembre', id: 9},
                    {nombre: 'Octubre', id: 10},{nombre: 'Noviembre', id: 11},{nombre: 'Diciembre', id: 12}]; 
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
      default: 
      return "Seleccione..."; 
    } 
  }

}
