import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PrintService } from 'src/app/print/print.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SiradigService, ListaItems } from '../siradig.service';
import { Siradig } from '../siradig.model';
import { LegajoService } from 'src/app/legajo/legajo.service';
import { NotificationService } from 'src/app/handler-error/notification.service';

@Component({
  selector: 'app-siradig-show',
  templateUrl: './siradig-show.component.html',
  styleUrls: ['./siradig-show.component.css']
})
export class SiradigShowComponent implements OnInit {
  public currentItem$: Observable<Siradig> = null;
  public print$: Observable<boolean> = null;
  id: number;
  public defaultDate$: Observable<Date>;
  public selectedMonthsFromMonthlyReports: number[] = [];

  hijossiradig: any[];
  conyugesiradig: any;
  currentDate: Date;
  currentYear;
  minDate: Date;

  constructor(
    private route: ActivatedRoute,
    private siradigService: SiradigService, 
    public dialog: MatDialog,
    private router: Router,
    public printService: PrintService,
    private legajoService: LegajoService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();

    this.minDate = new Date();
    this.minDate.setFullYear(1950);
  }

  ngOnInit() {
    this.currentItem$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo SiRADIG");
        }

        this.id = +params.get('id');
        const siradig = await this.siradigService.getSiradig(this.id);

        this.procesarSiradig(siradig);
        this.setDefaultDate(siradig);

        return siradig;
      })
    );

    this.print$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const print = (params.get('action') == "imprimir");
        if (print) {
          console.log("Action Imprimir");
        }

        return of(print);
      })
    );
  }

  private gotoGrilla() {
    this.router.navigate(['/siradig']);
  }

  private setDefaultDate(siradig: Siradig) {
    this.defaultDate$ = new Observable((observer) => {
      observer.next(this.getSiradigPeriodDate(siradig.periodosiradig));
      observer.complete();
    });
  }

  public onDatePickerChange(event, data) {
    data.periodosiradig = event;
  }

  public onYearSelectChange(payload: number, data: Siradig) {
    const date = new Date(payload, 0, 1).toISOString();
    data.periodosiradig = date;
    this.siradigValidator(data);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Siradig): Promise<Siradig> {
    //if(this.faltanRequeridos()) return null;

    // Se elimina
    if(this.conyugesiradig && this.conyugesiradig.ID && !this.conyugesiradig.aplica) {
      this.conyugesiradig.DeletedAt = new Date();
      data.detallecargofamiliarsiradig.push(this.conyugesiradig);
    }
    // Se crea o actualiza
    if(this.conyugesiradig && this.conyugesiradig.aplica) {
      data.detallecargofamiliarsiradig.push(this.conyugesiradig);
    }

    if(this.hijossiradig) {
      this.hijossiradig.forEach(hijo => {
        // Se elimina
        if(hijo.ID && !hijo.aplica) {
          hijo.DeletedAt = new Date();
          data.detallecargofamiliarsiradig.push(hijo);
        }
        // Se crea o actualiza
        if(hijo.aplica) {
          data.detallecargofamiliarsiradig.push(hijo);
        }
      });
    }

    let item: Siradig;

    if (this.id) {
      console.log("Updated Siradig");
      item = await this.siradigService.putSiradig(data);
      this.gotoGrilla();
    } else {
      console.log("Created Siradig");
      item = await this.siradigService.postSiradig(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(legajosItem)
    return item;
  }

  private procesarSiradig(siradig: Siradig) {
    this.procesarConyuge(siradig);
    this.procesarHijos(siradig);
  }

  private procesarConyuge(siradig: Siradig) {
    if(siradig && siradig.legajo && siradig.legajo.conyuge.length > 0) {
      const conyugesiradigArray = new Array();
      siradig.legajo.conyuge.forEach(conyuge => {
        const indexItemSiradig = siradig.detallecargofamiliarsiradig.findIndex(item => item.siradigtipogrilla.codigo == "CONYUGE_SIRADIG" && item.conyuge.ID == conyuge.ID);
        let conyugesiradig;
        if(indexItemSiradig >= 0) {
          conyugesiradig = {
            nombre: conyuge.nombre,
            aplica: true,
            ID: siradig.detallecargofamiliarsiradig[indexItemSiradig].ID,
            siradigtipogrilla: {
              ID: -2,
              codigo: "CONYUGE_SIRADIG",
            },
            siradigtipogrillaid: -2,
            siradigid: siradig.detallecargofamiliarsiradig[indexItemSiradig].siradigid,
            hijo: null,
            hijoid: null,
            conyuge: conyuge,
            conyugeid: conyuge.ID,
            estaacargo: siradig.detallecargofamiliarsiradig[indexItemSiradig].estaacargo,
            residenteenelpais: siradig.detallecargofamiliarsiradig[indexItemSiradig].residenteenelpais,
            obtuvoingresos: siradig.detallecargofamiliarsiradig[indexItemSiradig].obtuvoingresos,
            montoanual: siradig.detallecargofamiliarsiradig[indexItemSiradig].montoanual==null?0:siradig.detallecargofamiliarsiradig[indexItemSiradig].montoanual,
            mesdesde: siradig.detallecargofamiliarsiradig[indexItemSiradig].mesdesde,
            meshasta: siradig.detallecargofamiliarsiradig[indexItemSiradig].meshasta,
            porcentaje: siradig.detallecargofamiliarsiradig[indexItemSiradig].porcentaje
          }

          siradig.detallecargofamiliarsiradig.splice(indexItemSiradig, 1);
        } else {
          conyugesiradig = {
            ID: null,
            nombre: conyuge.nombre,
            aplica: false,
            siradigtipogrilla: {
              ID: -2,
              codigo: "CONYUGE_SIRADIG",
            },
            siradigtipogrillaid: -2,
            siradigid: siradig.ID,
            hijo: null,
            hijoid: null,
            conyuge: conyuge,
            conyugeid: conyuge.ID,
            estaacargo: null,
            residenteenelpais: null,
            obtuvoingresos: null,
            montoanual: 0,
            mesdesde: null,
            meshasta: null,
            porcentaje: null
          }
        }

        conyugesiradigArray.push(conyugesiradig);
      });

      this.conyugesiradig = conyugesiradigArray[0];
    }
  }

  private procesarHijos(siradig: Siradig) {
    if(siradig && siradig.legajo && siradig.legajo.hijos.length > 0) {
      const hijosiradigArray = new Array();
      siradig.legajo.hijos.forEach(hijo => {
        const indexItemSiradig = siradig.detallecargofamiliarsiradig.findIndex(item => item.siradigtipogrilla.codigo == "HIJO_SIRADIG" && item.hijo.ID == hijo.ID);
        let hijosiradig;
        if(indexItemSiradig >= 0) {
          hijosiradig = {
            nombre: hijo.nombre,
            aplica: true,
            ID: siradig.detallecargofamiliarsiradig[indexItemSiradig].ID,
            siradigtipogrilla: {
              ID: -1,
              codigo: "HIJO_SIRADIG",
            },
            siradigtipogrillaid: -1,
            siradigid: siradig.detallecargofamiliarsiradig[indexItemSiradig].siradigid,
            hijo: hijo,
            hijoid: hijo.ID,
            conyuge: null,
            conyugeid: null,
            estaacargo: siradig.detallecargofamiliarsiradig[indexItemSiradig].estaacargo,
            residenteenelpais: siradig.detallecargofamiliarsiradig[indexItemSiradig].residenteenelpais,
            obtuvoingresos: siradig.detallecargofamiliarsiradig[indexItemSiradig].obtuvoingresos,
            montoanual: siradig.detallecargofamiliarsiradig[indexItemSiradig].montoanual==null?0:siradig.detallecargofamiliarsiradig[indexItemSiradig].montoanual,
            mesdesde: siradig.detallecargofamiliarsiradig[indexItemSiradig].mesdesde,
            meshasta: siradig.detallecargofamiliarsiradig[indexItemSiradig].meshasta,
            porcentaje: siradig.detallecargofamiliarsiradig[indexItemSiradig].porcentaje
          }

          siradig.detallecargofamiliarsiradig.splice(indexItemSiradig, 1);
        } else {
          hijosiradig = {
            ID: null,
            nombre: hijo.nombre,
            aplica: false,
            siradigtipogrilla: {
              ID: -1,
              codigo: "HIJO_SIRADIG",
            },
            siradigtipogrillaid: -1,
            siradigid: siradig.ID,
            hijo: hijo,
            hijoid: hijo.ID,
            conyuge: null,
            conyugeid: null,
            estaacargo: null,
            residenteenelpais: null,
            obtuvoingresos: null,
            montoanual: 0,
            mesdesde: null,
            meshasta: null,
            porcentaje: null
          }
        }

        hijosiradigArray.push(hijosiradig);
      });

      this.hijossiradig = hijosiradigArray;
    }
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

  getBoolean(event) {
    return event.nombre.toLowerCase() == "si"
  }

  getYear(fecha) {
    return new Date(fecha).getFullYear();
  }

  getSiradigPeriodDate(date): Date {
    if (!date) {
      return null;
    }

    return new Date(date);
  }

  getMonth(fecha, periodosiradig=null) {
    return new Date(fecha).getMonth();
  }

  getDateFromYear(e) {
    const value = parseInt(e.target.value, 10);
    const date = new Date(value, 0, 1).toISOString();
    return date;
  }

  getDateFromYearMonth(year, month) {
    console.log("MES: ", month);
    const date = new Date(year, month, 1).toISOString();
    return date;
  }

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }

  onDeleteMonthlyReportItemClick(child: any) {
    this.onClickDeleteChild(child);

    const itemMonth = new Date(child.mes).getMonth();
    const index = this.selectedMonthsFromMonthlyReports.findIndex((item) => item === itemMonth);

    this.selectedMonthsFromMonthlyReports.splice(index, 1);
  }

  onClickNewImportegananciasotroempleosiradig(siradig: Siradig) {
    if(siradig.importegananciasotroempleosiradig == null) {
      siradig.importegananciasotroempleosiradig = [{
        ID: null,
        mes: null,
        importegananciasbrutas: null,
        aporteseguridadsocial: null,
        aporteobrasocial: null,
        aportesindical: null,
        importeretribucionesnohabituales: null,
        importeretencionesgananciassufridas: null,
        ajustes: null,
        importeconceptosexentos: null,
        sac: null,
        importehorasextrasgravadas: null,
        importehorasextrasexentas: null,
        materialdidactico: null,
        gastosmovilidad: null
      }];      
    } else {
      siradig.importegananciasotroempleosiradig.push({
        ID: null,
        mes: null,
        importegananciasbrutas: null,
        aporteseguridadsocial: null,
        aporteobrasocial: null,
        aportesindical: null,
        importeretribucionesnohabituales: null,
        importeretencionesgananciassufridas: null,
        ajustes: null,
        importeconceptosexentos: null,
        sac: null,
        importehorasextrasgravadas: null,
        importehorasextrasexentas: null,
        materialdidactico: null,
        gastosmovilidad: null
      });
    }
  }

  onClickNewDeducciondesgravacionsiradig(siradig: Siradig, siradigtipogrillaCodigo: String, siradigtipogrillaId: number) {
    if(siradig.deducciondesgravacionsiradig == null) {
      siradig.deducciondesgravacionsiradig = [{
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        mes: null,
        meshasta: null,
        importe: null,
        descripcion: null,
        comprobante: null,
        contribucion: null,
        retribucion: null,
        cuit: null,
        empresa: null,
        montocapitalaporte: null,
        montofondoriesgoaporte: null,
        valor: null,
        porcentajeafectacion: null,
        amortizacionperiodo: null
      }];      
    } else {
      siradig.deducciondesgravacionsiradig.push({
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        mes: null,
        meshasta: null,
        importe: null,
        descripcion: null,
        comprobante: null,
        contribucion: null,
        retribucion: null,
        cuit: null,
        empresa: null,
        montocapitalaporte: null,
        montofondoriesgoaporte: null,
        valor: null,
        porcentajeafectacion: null,
        amortizacionperiodo: null
      });
    }
  }

  onClickNewRetencionpercepcionsiradig(siradig: Siradig, siradigtipogrillaCodigo: String, siradigtipogrillaId: number) {
    if(siradig.retencionpercepcionsiradig == null) {
      siradig.retencionpercepcionsiradig = [{
        ID: null,
        siradigtipogrilla: {
          ID: siradigtipogrillaId,
          codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        siradigtipoimpuestoid: null,
        siradigtipooperacionid: null,
        mes: 0,
        importe: null,
        descripcion: null
      }]      
    } else {
      siradig.retencionpercepcionsiradig.push({
        ID: null,
        siradigtipogrilla: {
          ID: siradigtipogrillaId,
          codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        siradigtipoimpuestoid: null,
        siradigtipooperacionid: null,
        mes: 0,
        importe: null,
        descripcion: null
      });
    }
  }

  onClickNewBeneficiosiradig(siradig: Siradig, siradigtipogrillaCodigo: String, siradigtipogrillaId: number) {
    if(siradig.beneficiosiradig == null) {
      siradig.beneficiosiradig = [{
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        mesdesde: null,
        meshasta: null,
        valor: false
      }];      
    } else {
      siradig.beneficiosiradig.push({
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        mesdesde: null,
        meshasta: null,
        valor: false
      });
    }
  }

  onClickNewAjustesiradig(siradig: Siradig, siradigtipogrillaCodigo: String, siradigtipogrillaId: number) {
    if(siradig.ajustesiradig == null) {
      siradig.ajustesiradig = [{
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        cuit: null,
        razonsocial: null,
        anio: null,
        montoretroactivocobrado: null,
        cumplesegundoparrafoley24467: false,
        montoreintegrar: null,
        cumpletercerparrafoley24467: false,
        montoreintegrar3: null
      }];      
    } else {
      siradig.ajustesiradig.push({
        ID: null,
        siradigtipogrilla: {
            ID: siradigtipogrillaId,
            codigo: siradigtipogrillaCodigo,
        },
        siradigtipogrillaid: siradigtipogrillaId,
        cuit: null,
        razonsocial: null,
        anio: null,
        montoretroactivocobrado: null,
        cumplesegundoparrafoley24467: false,
        montoreintegrar: null,
        cumpletercerparrafoley24467: false,
        montoreintegrar3: null
      });
    }
  }

  async legajoSelected(e, data) {
    data.legajoid=e.ID;

    const legajo = await this.legajoService.getLegajo(data.legajoid);
    data.legajo = legajo;
    data.detallecargofamiliarsiradig = [];
    data.importegananciasotroempleosiradig = [];
    data.deducciondesgravacionsiradig = [];
    data.retencionpercepcionsiradig = [];
    data.beneficiosiradig = [];
    data.ajustesiradig = [];

    this.procesarSiradig(data);

    this.siradigValidator(data);
  }
  
  existe(array, codigo) {
    if(array) {
      return array.findIndex(element => element.siradigtipogrilla.codigo == codigo && element.DeletedAt == null) >= 0;
    } else {
      return false;
    }
  }

  public updateMonthlyReportItem(data: Siradig, item: any, monthIndex: number) {
    item.mes = this.getDateFromYearMonth(this.getYear(data.periodosiradig), monthIndex);

    this.updateSelectedMonthsFromMonthlyReports(data);
  }

  private updateSelectedMonthsFromMonthlyReports(data: Siradig) {
    this.selectedMonthsFromMonthlyReports = data.importegananciasotroempleosiradig.map((monthlyReport: any) => {
      return new Date(monthlyReport.mes).getMonth();
    });

    this.cdr.detectChanges();
  }

  private async siradigValidator(data: Siradig) {
    if(data && data.legajoid && data.periodosiradig) {
      const itemsApi: ListaItems = await this.siradigService.getSiradigs(data.legajoid, data.periodosiradig.split("-")[0]);
      if(itemsApi.total_count > 0 && !this.isMyself(itemsApi)) {
        const notificacion = {
          codigo: 400,
          mensaje: `Ya existe un SiRADIG para el legajo "${data.legajo.nombre}" correspondiente al periodo "${data.periodosiradig.split("-")[0]}"`
        }
        const ret = this.notificationService.notify(notificacion);
      }
    }
  }

  private isMyself(itemsApi) {
    return itemsApi.total_count == 1 && itemsApi.items[0].ID == this.id;
  }

  public getFullDate(year) {
    const date = new Date(year, 0, 1).toISOString();
    return date;
  }
}
