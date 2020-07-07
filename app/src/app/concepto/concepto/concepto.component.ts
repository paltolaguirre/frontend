import { AutomaticCalculationTypes } from './../../core/enums/automatic-calc-types.enum';
import { FormulaService } from './../../core/services/formula/formula.service';
import { Formula } from 'src/app/core/models/formula.model';
import { ConceptoService } from '../concepto.service';
import { Concepto, TIPO_CALCULO_AUTOMATICO, TIPO_CONCEPTO, FORMULA_GANANCIAS, FORMULA_GANANCIAS_DEVOLUCION, TIPO_CALCULO_AUTOMATICO_CODIGO, CONCEPTO_AFIP_GANANCIAS_ID, CONCEPTO_AFIP_GANANCIAS_DEVOLUCION_ID } from '../concepto.model';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PrintService } from 'src/app/print/print.service';
import { ThrowStmt } from '@angular/compiler';

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
    public printService: PrintService
  ) { }


  ngAfterViewInit(): void {
  }

  async ngOnInit() {
    this.currentConcepto$ = await this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Concepto");
        }
        this.id = +params.get('id');
        const concepto = this.conceptoService.getConcepto(this.id);
        console.log(concepto);

        return concepto;
      })
    );

    this.currentConcepto$.subscribe(concepto => {
      this.selectedFormula = concepto.formula
    })
  }


  tieneCalculoFormula(concepto: Concepto) {
    return false
  }

  tieneCalculoPorcentaje(concepto: Concepto) {
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

    if (this.estaGuardandose || this.faltanRequeridos()) return null;

    this.estaGuardandose = true;

    let conceptosItem: Concepto;

    //if(data.cuenta)data.cuentacontableid = data.cuenta.ID;
    let that = this;
    if (this.id) {
      console.log("Updated Concepto");
      conceptosItem = await this.conceptoService.putConcepto(data).finally(function () { that.habilitarGuardado(); });
      this.gotoGrilla();
      //   this.notificationService.notify("Concepto Actualizado");
    } else {
      console.log("Created Concepto");
      conceptosItem = await this.conceptoService.postConcepto(data).finally(function () { that.habilitarGuardado(); });
      this.gotoGrilla();
      //     this.notificationService.notify("Concepto Creado");
    }

    console.log(data);
    //this.create.emit(conceptosItem)
    return conceptosItem;
  }


  habilitarGuardado() {
    this.estaGuardandose = false
  }

  isNew(data): Boolean {
    return data.ID == null ? false : true;
  }

  isDefault(data): Boolean {
    return data.ID < 0 ? true : false;
  }

  onChangeTipoConcepto(concepto: Concepto, id: any) {
    switch (id) {
      case -1:
        concepto.esganancias = false
      case -2:
        concepto.cuentacontableid = -46
        concepto.cuentacontablepasivoid = -49
        break;
      case -3:
        concepto.cuentacontableid = -49
        concepto.cuentacontablepasivoid = -46
        concepto.esganancias = false
        break;
      case -4:
        concepto.cuentacontableid = -49
        concepto.cuentacontablepasivoid = -48
        break;
      case -5:
        concepto.cuentacontableid = -47
        concepto.cuentacontablepasivoid = -48
        concepto.esganancias = false
        break;
    }
    this.onChangeEsGanancias(concepto);
  }

  isDefaultOrNoImprimible(data): Boolean {
    return this.isDefault(data) || !data.esimprimible
  }

  selectChange(event, data) {
    data.cuenta = event
    data.cuentacontableid = event.id
  }

  getFilterTipoimpuestosganancias(concepto: Concepto) {
    console.log("Concepto: ", concepto);
    let filterTipoconcepto = "";
    if (concepto && concepto.tipoconcepto && concepto.tipoconcepto.codigo) {
      filterTipoconcepto = "tipoconcepto=" + concepto.tipoconcepto.codigo;
    }

    return filterTipoconcepto;
  }

  getPresetearValores(concepto: Concepto) {
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

    if (tipoimpuestosganancias.myControl.value == "") {
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

  public onAutomaticCalcGroupSelected(concepto: Concepto) {
    switch (concepto.tipocalculoautomatico.codigo) {
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

  noPuedeSerGanancias(concepto: Concepto): Boolean {
    return (concepto.tipoconceptoid != TIPO_CONCEPTO.RETENCION && concepto.tipoconceptoid != TIPO_CONCEPTO.IMPORTE_NO_REMUNERATIVO)
  }

  onChangeEsGanancias(concepto: Concepto) {
    if (concepto.esganancias) {
      concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.FORMULA;
      concepto.tipocalculoautomaticoid = TIPO_CALCULO_AUTOMATICO.FORMULA;
      concepto.tipocalculoautomatico.codigo = TIPO_CALCULO_AUTOMATICO_CODIGO.FORMULA;
      concepto.tipocalculoautomatico.codigo = TIPO_CALCULO_AUTOMATICO_CODIGO.FORMULA;
      concepto.basesac = false;
      concepto.prorrateo = false;
      concepto.tipoimpuestogananciasid = null;
      concepto.tipoimpuestoganancias = null;
      if (concepto.tipoconceptoid == TIPO_CONCEPTO.RETENCION) {
        concepto.conceptoafipid = CONCEPTO_AFIP_GANANCIAS_ID 
        concepto.formulanombre = FORMULA_GANANCIAS;
      } else {
        concepto.conceptoafipid = CONCEPTO_AFIP_GANANCIAS_DEVOLUCION_ID
        concepto.formulanombre = FORMULA_GANANCIAS_DEVOLUCION;
      }
    } else {
      concepto.conceptoafipid = null
      concepto.tipocalculoautomatico.ID = TIPO_CALCULO_AUTOMATICO.NO_APLICA;
      concepto.tipocalculoautomaticoid = TIPO_CALCULO_AUTOMATICO.NO_APLICA;
      concepto.tipocalculoautomatico.codigo = TIPO_CALCULO_AUTOMATICO_CODIGO.NO_APLICA;
      concepto.formulanombre = null;
    }
  }
}
