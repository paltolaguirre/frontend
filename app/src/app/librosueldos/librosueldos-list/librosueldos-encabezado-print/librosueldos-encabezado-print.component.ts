import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PrintService } from 'src/app/print/print.service';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LibrosueldosService } from '../../librosueldos.service';

@Component({
  selector: 'app-librosueldos-encabezado-print',
  templateUrl: './librosueldos-encabezado-print.component.html',
  styleUrls: ['./librosueldos-encabezado-print.component.css']
})
export class LibrosueldosEncabezadoPrintComponent implements OnInit {
  public encabezado$: Observable<any> = null;

  hojadesde: any;
  hojahasta: any;
  show: boolean;
  hojas: number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public printService: PrintService,
    private notificationService: NotificationService,
    private librosueldosService: LibrosueldosService,
    ) { }

  ngOnInit() {
    this.encabezado$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        this.hojadesde = this.route.snapshot.queryParamMap.get("hojadesde");
        this.hojahasta = this.route.snapshot.queryParamMap.get("hojahasta");

        const datosEncabezado = await this.librosueldosService.getLibrosueldosEncabezado();

        if(!this.isEncabezadoValido()) {
          const notificacion = {
            codigo: 400,
            mensaje: "Los parametros 'hojadesde' y 'hojahasta' deben ser igual o mayor a 1"
          }
          const ret = this.notificationService.notify(notificacion);
        } else {
          this.show = true;
        }

        this.hojas = this.generarArrayHojas();
        
        return datosEncabezado;
      })
    );
  }

  generarArrayHojas(): number[] {
    const array = new Array();
    for (let index = this.hojadesde; index <= this.hojahasta; index++) {
      array.push(index);
    }

    return array;
  }

  isEncabezadoValido(): boolean {
    const ret = this.hojadesde && this.hojadesde > 0;
    
    return ret;
  }

  async ngAfterViewInit() {
    /*const liquidacionesApi: ListaItems = await this.liquidacionService.getLiquidaciones(null, null, 1);
    this.liquidaciones = liquidacionesApi.items;
    console.log(this.liquidaciones);*/
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
