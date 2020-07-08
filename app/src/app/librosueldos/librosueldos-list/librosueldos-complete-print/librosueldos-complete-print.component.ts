import { Component, OnInit, Input } from '@angular/core';
import { LibrosueldosListPrintComponent } from '../librosueldos-list-print/librosueldos-list-print.component';
import { LibrosueldosEncabezado } from '../../librosueldos.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { LibrosueldosService, ListaItems } from '../../librosueldos.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Liquidacion } from 'src/app/liquidacion/liquidacion.model';
import { LiquidacionService } from 'src/app/liquidacion/liquidacion.service';
import { Legajo } from 'src/app/legajo/legajo.model';

@Component({
  selector: 'app-librosueldos-complete-print',
  templateUrl: './librosueldos-complete-print.component.html',
  styleUrls: ['./librosueldos-complete-print.component.css']
})
export class LibrosueldosCompletePrintComponent implements OnInit {
  @Input() liquidaciones: any;
  public currentLiquidaciones$: Observable<Liquidacion[]> = null;
  public encabezado$: Observable<any> = null;
  fechadesde: any;
  fechahasta: any;
  show: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private liquidacionService: LiquidacionService,
    public printService: PrintService,
    private notificationService: NotificationService,
    private librosueldosService: LibrosueldosService,
  ) { }

  ngOnInit() {

    this.fechadesde = this.route.snapshot.queryParamMap.get('fechadesde');
    this.fechahasta = this.route.snapshot.queryParamMap.get('fechahasta');


    console.log("fechadesde: " + this.fechadesde);
    console.log("fechahasta: " + this.fechahasta);

    this.currentLiquidaciones$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {


        const liquidacionesApi = await this.liquidacionService.getLiquidacionesPorFecha(null, null, 1, this.fechadesde, this.fechahasta);


        const liquidaciones = liquidacionesApi.items;
        if (!this.isLegajosValidos(liquidaciones)) {
          const notificacion = {
            codigo: 400,
            mensaje: "Para poder realizar esta acción primero deberá completar todos los datos obligatorios de los legajos involucrados en el informe a imprimir disponibles en Sueldos>Legajos"
          }
          const ret = this.notificationService.notify(notificacion);
        } else {
          this.show = true;
        }


        return liquidaciones;
      })
    );

    this.encabezado$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {

        const datosEncabezado = await this.librosueldosService.getLibrosueldosEncabezado();

        if (this.isEncabezadoValido(datosEncabezado)) {
          this.show = true;
        }

        return datosEncabezado;
      })
    );
  }

  isEncabezadoValido(encabezado: LibrosueldosEncabezado): boolean {

    if (encabezado.actividadempresa == "" || encabezado.cuitempresa == "" || encabezado.descripcion == "" || encabezado.domicilioempresa == "" || encabezado.nombreempresa == "") {
      const notificacion = {
        codigo: 400,
        mensaje: "Para poder realizar esta acción primero deberá completar todos los datos de la empresa"
      }
      const ret = this.notificationService.notify(notificacion);

      return false;
    }

    return true;
  }

  isLegajosValidos(liquidaciones: Liquidacion[]): boolean {
    let ret = true;
    liquidaciones.forEach(liquidacion => {
      if (!this.isLegajoValido(liquidacion.legajo)) {
        ret = false;
      }
    });

    return ret;
  }

  // TODO: conciderar ponerlo en el servicio de Legajo
  isLegajoValido(legajo: Legajo): boolean {
    if (!legajo.legajo) return false;
    if (!legajo.cuil) return false;
    if (!legajo.apellido) return false;
    if (!legajo.nombre) return false;
    if (!legajo.paisid) return false;
    if (!legajo.provinciaid) return false;
    if (!legajo.localidadid) return false;
    if (!legajo.estadocivilid) return false;
    if (!legajo.situacionid) return false;
    if (!legajo.condicionid) return false;
    if (!legajo.modalidadcontratacionid) return false;
    if (!legajo.obrasocialid) return false;
    if (!legajo.condicionsiniestradoid) return false;
    if (!legajo.horasmensualesnormales) return false;
    if (!legajo.conveniocolectivo) return false;
    if (!legajo.categoria) return false;
    if (!legajo.tarea) return false;
    if (!legajo.fechaalta) return false;

    return true;
  }

  async ngAfterViewInit() {
    const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidacionesPorFecha(null, null, 1, this.fechadesde, this.fechahasta);
    this.liquidaciones = liquidacionesApi.items;
    console.log(this.liquidaciones);
  }

  private gotoGrilla() {
    this.router.navigate(['/informes/libro-sueldos']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  onClickPrint() {
    this.printService.printTOPDF();
  }

  obtenerDniFromCuil(cuil) {
    return cuil.slice(2, cuil.length - 1);
  }
}
