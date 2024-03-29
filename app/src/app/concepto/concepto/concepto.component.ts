import { Formula } from 'src/app/core/models/formula.model';
import { ConceptoService } from '../concepto.service';
import { Concepto, TIPO_CALCULO_AUTOMATICO } from '../concepto.model';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PrintService } from 'src/app/print/print.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.scss']
})
export class ConceptoComponent implements OnInit, AfterViewInit {
  public currentConcepto$: Observable<Concepto> = null;
  paises: any[];
  id: number;
  public selectedFormula: Formula;
  public estaGuardandose: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private conceptoService: ConceptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService : PrintService,
    private loadingService: LoadingService
    ) { }


  ngAfterViewInit(): void {
  }

 async ngOnInit() {
    this.currentConcepto$ = await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Concepto");
        }

        this.id = +params.get('id');
        this.loadingService.show();

        const concepto = await this.conceptoService.getConcepto(this.id);

        this.loadingService.hide();

        return concepto;
      })
    );

    this.currentConcepto$.subscribe(concepto => {
      this.selectedFormula = concepto.formula
    })
  }


  tieneCalculoFormula(concepto: Concepto){
    return false
  }

  tieneCalculoPorcentaje(concepto: Concepto){
      return concepto.porcentaje && concepto.tipodecalculoid
  }

  private gotoGrilla() {
    this.estaGuardandose = true;
    this.router.navigate(['/conceptos']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Concepto): Promise<Concepto> {
    this.loadingService.show();

    if (this.estaGuardandose || this.faltanRequeridos()) {
      this.loadingService.hide();

      return null;
    }

    this.estaGuardandose = true;

    let conceptosItem: Concepto;

    let that = this;
    if (this.id) {
      conceptosItem = await this.conceptoService.putConcepto(data).finally(function(){that.habilitarGuardado();});

      this.gotoGrilla();
    } else {
      conceptosItem = await this.conceptoService.postConcepto(data).finally(function(){that.habilitarGuardado();});

      this.gotoGrilla();
    }

    this.loadingService.hide();

    return conceptosItem;
  }


  habilitarGuardado() {
    this.estaGuardandose = false
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

  isDefault(data) : Boolean {
    return data.ID<0?true:false;
  }

  onChangeTipoConcepto(concepto:Concepto, id: any) {
    switch (id) {
      case -1:
      case -2:
        concepto.cuentacontableid = -46
        concepto.cuentacontablepasivoid = -49
      return;
      case -3:
        concepto.cuentacontableid = -49
        concepto.cuentacontablepasivoid = -46
        return;
      case -4:
        concepto.cuentacontableid = -49
        concepto.cuentacontablepasivoid = -48
        return;
      case -5:
          concepto.cuentacontableid = -47
          concepto.cuentacontablepasivoid = -48
        return;
    }
  }

  isDefaultOrNoImprimible(data):Boolean{
    return this.isDefault(data)||!data.esimprimible
  }

  selectChange(event,data)
  {
    data.cuenta = event
    data.cuentacontableid = event.id
  }

  getFilterTipoimpuestosganancias(concepto: Concepto) {
    console.log("Concepto: ", concepto);
    let filterTipoconcepto = "";
    if(concepto && concepto.tipoconcepto && concepto.tipoconcepto.codigo) {
      filterTipoconcepto = "tipoconcepto="+concepto.tipoconcepto.codigo;
    }

    return filterTipoconcepto;
  }

  getPresetearValores(concepto:Concepto){
    switch (concepto.tipoconcepto.codigo) {
      case 'IMPORTE_REMUNERATIVO':
        concepto.marcarepeticion = true;
        concepto.aportesipa = true;
        concepto.contribucionsipa = true;
        concepto.aportesinssjyp = true;
        concepto.contribucionesinssjyp = true;
        concepto.aportesobrasocial = true;
        concepto.contribucionesobrasocial = true;
        concepto.aportesfondosolidario = true;
        concepto.contribucionesfondosolidario = true;
        concepto.aportesrenatea = true;
        concepto.contribucionesrenatea = true;
        concepto.asignacionesfamiliares = true;
        concepto.contribucionesfondonacional = true;
        concepto.contribucionesleyriesgo = true;
        concepto.aportesregimenesdiferenciales = true;
        concepto.aportesregimenesespeciales = true;
        return;
        case 'DESCUENTO':
          concepto.marcarepeticion = true;
          concepto.aportesipa = true;
          concepto.contribucionsipa = true;
          concepto.aportesinssjyp = true;
          concepto.contribucionesinssjyp = true;
          concepto.aportesobrasocial = true;
          concepto.contribucionesobrasocial = true;
          concepto.aportesfondosolidario = true;
          concepto.contribucionesfondosolidario = true;
          concepto.aportesrenatea = true;
          concepto.contribucionesrenatea = true;
          concepto.asignacionesfamiliares = true;
          concepto.contribucionesfondonacional = true;
          concepto.contribucionesleyriesgo = true;
          concepto.aportesregimenesdiferenciales = true;
          concepto.aportesregimenesespeciales = true;
          return;
      case 'IMPORTE_NO_REMUNERATIVO':
        concepto.contribucionesleyriesgo = true;
        return;

      case 'RETENCION':
          concepto.marcarepeticion = false;
          concepto.aportesipa = false;
          concepto.contribucionsipa = false;
          concepto.aportesinssjyp = false;
          concepto.contribucionesinssjyp = false;
          concepto.aportesobrasocial = false;
          concepto.contribucionesobrasocial = false;
          concepto.aportesfondosolidario = false;
          concepto.contribucionesfondosolidario = false;
          concepto.aportesrenatea = false;
          concepto.contribucionesrenatea = false;
          concepto.asignacionesfamiliares = false;
          concepto.contribucionesfondonacional = false;
          concepto.contribucionesleyriesgo = false;
          concepto.aportesregimenesdiferenciales = false;
          concepto.aportesregimenesespeciales = false;
          return;
    }
  }

  changeHandler(data, tipoimpuestosganancias) {
    console.log("tipoimpuestosganancias: ", tipoimpuestosganancias);

    if(tipoimpuestosganancias.myControl.value == "") {
      data.tipoimpuestogananciasid = null;
      data.tipoimpuestoganancias = null;
    }
    /*mat-input-7 */
  }

  faltanRequeridos() {
    var todos = document.getElementsByTagName('*');
    var requeridos = new Array();
    for (let obj of todos as any) {
      if (obj.required && obj.value == "") {
        // requeridos.push(obj);
        let placeholder = obj.getAttribute("placeholder");
        const notificacion = {
          codigo: 400,
          mensaje: `El campo "${placeholder}" es obligatorio.`
        }
        const ret = this.notificationService.notify(notificacion);
        return true;
      }
    }
    return false;
  }

  public onFormulaSelected(concepto: Concepto) {
    concepto.formula = this.selectedFormula
    concepto.formulanombre = this.selectedFormula.name
    console.log(this.selectedFormula);
  }

  public onAutomaticCalcGroupSelected(concepto: Concepto){
    switch(concepto.tipocalculoautomatico.codigo){
      case 'PORCENTAJE':
        concepto.tipocalculoautomaticoid = TIPO_CALCULO_AUTOMATICO.PORCENTAJE;
        concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.PORCENTAJE;
        break;
      case 'FORMULA':
        concepto.tipocalculoautomaticoid = TIPO_CALCULO_AUTOMATICO.FORMULA;
        concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.FORMULA;
        break;

      default:

      concepto.tipocalculoautomaticoid = TIPO_CALCULO_AUTOMATICO.NO_APLICA;
      concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.NO_APLICA;
    }


  }


}
