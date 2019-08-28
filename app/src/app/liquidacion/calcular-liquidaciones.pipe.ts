import { Pipe, PipeTransform } from '@angular/core';
import { Liquidacion, LiquidacionCalculada } from './liquidacion.model';
import { LiquidacionService } from './liquidacion.service';

@Pipe({
  name: 'calcularLiquidaciones'
})
export class CalcularLiquidacionesPipe implements PipeTransform {
  constructor(private liquidacionService: LiquidacionService) {
  }
  transform(liquidaciones: Liquidacion[], args?: any): LiquidacionCalculada[] {
    let output = [];
    liquidaciones.forEach(liquidacion => {
      let liquidacionCalculada: LiquidacionCalculada;
      liquidacionCalculada = {
        liquidacion: null,
        calculo: null
      };

      liquidacionCalculada.liquidacion = liquidacion;
      liquidacionCalculada.calculo = this.liquidacionService.calcularLiquidacion(liquidacion);

      output.push(liquidacionCalculada);
    });
    
    console.log("CalcularLiquidaciones:");
    console.log(output);
    
    return output;
  }

}
