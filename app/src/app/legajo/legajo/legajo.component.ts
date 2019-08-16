import { ListaItems, LegajoService } from '../legajo.service';
import { Legajo, Hijo } from '../legajo.model';
import { formatDate } from "@angular/common";
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MatDialogConfig , MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SelectorDefaultComponent } from 'src/app/shared/selector-default/selector-default.component';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.css']
})
export class LegajoComponent implements OnInit, AfterViewInit {
  public currentLegajo$: Observable<Legajo> = null;
  paises: any[];
  id: number;
  data : any;

  constructor(
    private route: ActivatedRoute,
    private legajoService: LegajoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService : PrintService
    ) { }

  ngOnInit() {
    
    this.currentLegajo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Legajo");
        }
        this.id = +params.get('id');
        const legajo = this.legajoService.getLegajo(this.id);
        console.log(legajo);
         
        return legajo;


      })
    );
  }

  ngAfterViewInit() {
    
  }

  private gotoGrilla() {
    this.router.navigate(['/legajos']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Legajo): Promise<Legajo> {
    if(this.faltanRequeridos()) return null;

    let legajosItem: Legajo;

    // se setea el paisID segun Option del selector de paises
    if(data.fechaalta)data.fechaalta = formatDate(data.fechaalta, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');
    if(data.fechabaja)data.fechabaja = formatDate(data.fechabaja, "yyyy-MM-dd'T'00:00:00.000000-03:00", 'en-US');

    if(data.situacion)data.situacionid = data.situacion.ID;
    if(data.pais)data.paisid = data.provincia.ID;
    if(data.localidad)data.localidadid = data.localidad.ID;
    if(data.obrasocial)data.obrasocialid = data.obrasocial.ID;
    if(data.condicionsiniestrado)data.condicionsiniestradoid = data.condicionsiniestrado.ID;
    if(data.modalidadcontratacion)data.modalidadcontratacionid = data.modalidadcontratacion.ID;
    if(data.condicion)data.condicionid = data.condicion.ID;
    
    if(data.conyuge){
      data.conyuge.forEach(function(element) {
        if(element.obrasocial) {
          element.obrasocial.activo = 1;
          element.obrasocialid = element.obrasocial.ID;
        }  
      });
    }

    if(data.hijos){
      data.hijos.forEach(function(element) {
        if(element.obrasocial) {
          element.obrasocial.activo = 1;
          element.obrasocialid = element.obrasocial.ID;
        }  
      });
    }
    if (this.id) {
      console.log("Updated Legajo");
      legajosItem = await this.legajoService.putLegajo(data);
      this.gotoGrilla();
    } else {
      console.log("Created Legajo");
      legajosItem = await this.legajoService.postLegajo(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(legajosItem)
    return legajosItem;
  }

  onClickNewConyuge(data: Legajo) {
    if(data.conyuge == null) {
      data.conyuge = [{
        ID: null,
        nombre: null,
        apellido: null,
        codigo: null,
        descripcion: null,
        cuil: null,
        activo: 1,
        obrasocialid: 1
      }];      
    } else {
      data.conyuge.push({
        ID: null,
        nombre: null,
        apellido: null,
        codigo: null,
        descripcion: null,
        cuil: null,
        activo: 1,
        obrasocialid: 1
      });
    }
  }

  onClickNewHijo(data: Legajo) {
    if(data.hijos == null) {
      data.hijos = [{
        ID: null,
        nombre: null,
        apellido: null,
        codigo: null,
        descripcion: null,
        cuil: null,
        activo: 1,
        obrasocialid: 1
      }];      
    } else {
      data.hijos.push({
        ID: null,
        nombre: null,
        apellido: null,
        codigo: null,
        descripcion: null,
        cuil: null,
        activo: 1,
        obrasocialid: 1
      });
    }  
  }
  
  onClickRefreshLocalidad (localidadid) {

  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }

  faltanRequeridos() {
    var todos = document.getElementsByTagName('*');
    var requeridos = new Array();
    for (let obj of todos as any) {
      if (obj.getAttribute("ng-reflect-required") == "true" && obj.value == "") {
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
}