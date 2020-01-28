import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LiquidacionService } from 'src/app/liquidacion/liquidacion.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { PrintService } from 'src/app/print/print.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SiradigService } from '../siradig.service';
import { Siradig } from '../siradig.model';
import { calculateBorderBoxPath } from 'html2canvas/dist/types/render/bound-curves';

@Component({
  selector: 'app-siradig-show',
  templateUrl: './siradig-show.component.html',
  styleUrls: ['./siradig-show.component.css']
})
export class SiradigShowComponent implements OnInit {
  public currentItem$: Observable<Siradig> = null;
  public print$: Observable<boolean> = null;
  id: number;

  hijossiradig: any[];
  conyugesiradig: any;
  currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private siradigService: SiradigService, 
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService: PrintService
  ) { }

  ngOnInit() {
    this.currentItem$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo SiRADIG");
        }
        this.id = +params.get('id');
        const siradig = await this.siradigService.getSiradig(this.id);

        console.log(siradig);
        
        this.procesarSiradig(siradig);

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
    this.router.navigate(['/informes/siradig']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Siradig): Promise<Siradig> {
    //if(this.faltanRequeridos()) return null;

    let item: Siradig;

    if (this.id) {
      console.log("Updated Siradig");
      //item = await this.siradigService.putSiradig(data);
      this.gotoGrilla();
    } else {
      console.log("Created Siradig");
      //item = await this.siradigService.postSiradig(data);
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
    if(siradig.legajo.conyuge.length > 0) {
      const conyugesiradigArray = new Array();
      siradig.legajo.conyuge.forEach(conyuge => {
        const itemSiradig = siradig.detallecargofamiliarsiradig.filter(item => item.siradigtipogrilla.codigo == "CONYUGE_SIRADIG" && item.conyuge.ID == conyuge.ID)[0];
        let conyugesiradig;
        if(itemSiradig) {
          conyugesiradig = {
            nombre: itemSiradig.conyuge.nombre,
            aplica: true,
            estaacargo: itemSiradig.estaacargo,
            residenteenelpais: itemSiradig.residenteenelpais,
            obtuvoingresos: itemSiradig.obtuvoingresos,
            montoanual: itemSiradig.montoanual,
            mesdesde: itemSiradig.mesdesde,
            meshasta: itemSiradig.meshasta 
          }
        } else {
          conyugesiradig = {
            nombre: conyuge.nombre,
            aplica: false,
            estaacargo: false,
            residenteenelpais: false,
            obtuvoingresos: false,
            montoanual: "",
            mesdesde: "",
            meshasta: ""
          }
        }

        conyugesiradigArray.push(conyugesiradig);
      });

      this.conyugesiradig = conyugesiradigArray[0];
    }
  }

  private procesarHijos(siradig: Siradig) {
    if(siradig.legajo.hijos.length > 0) {
      const hijosiradigArray = new Array();
      siradig.legajo.hijos.forEach(hijo => {
        const itemSiradig = siradig.detallecargofamiliarsiradig.filter(item => item.siradigtipogrilla.codigo == "HIJO_SIRADIG" && item.hijo.ID == hijo.ID)[0];
        let hijosiradig;
        if(itemSiradig) {
          hijosiradig = {
            nombre: itemSiradig.hijo.nombre,
            aplica: true,
            estaacargo: itemSiradig.estaacargo,
            residenteenelpais: itemSiradig.residenteenelpais,
            obtuvoingresos: itemSiradig.obtuvoingresos,
            montoanual: itemSiradig.montoanual,
            mesdesde: itemSiradig.mesdesde,
            meshasta: itemSiradig.meshasta 
          }
        } else {
          hijosiradig = {
            nombre: hijo.nombre,
            aplica: false,
            estaacargo: false,
            residenteenelpais: false,
            obtuvoingresos: false,
            montoanual: "",
            mesdesde: "",
            meshasta: ""
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
        /*siradigtipoimpuesto: {
            ID: -1,
            nombre: "Impuestos sobre créditos y débitos en cuenta Bancaria",
            codigo: "IMPUESTOS_SOBRE_CREDITOS_Y_DEBITOS_EN_CUENTA_BANCARIA",
            descripcion: "",
            activo: 1
        },*/
        siradigtipoimpuestoid: null,
        /*siradigtipooperacion: {
            ID: 0,
            nombre: "",
            codigo: "",
            descripcion: "",
            activo: 0
        },*/
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
        /*siradigtipoimpuesto: {
            ID: -1,
            nombre: "Impuestos sobre créditos y débitos en cuenta Bancaria",
            codigo: "IMPUESTOS_SOBRE_CREDITOS_Y_DEBITOS_EN_CUENTA_BANCARIA",
            descripcion: "",
            activo: 1
        },*/
        siradigtipoimpuestoid: null,
        /*siradigtipooperacion: {
            ID: 0,
            nombre: "",
            codigo: "",
            descripcion: "",
            activo: 0
        },*/
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
}
