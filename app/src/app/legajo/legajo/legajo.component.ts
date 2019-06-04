import { LegajoService } from '../legajo.service';
import { Legajo, Hijo } from '../legajo.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MatDialogConfig , MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddLegajoDialog } from './add-legajo/add-legajo.component';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.css']
})
export class LegajoComponent implements OnInit, AfterViewInit {
  public currentLegajo$: Observable<Legajo> = null;
  paises: any[];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private legajoService: LegajoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
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
    let legajosItem: Legajo;

    // se setea el paisID segun Option del selector de paises

    if (this.id) {
      console.log("Updated Legajo");
      legajosItem = await this.legajoService.putLegajo(data);
    } else {
      console.log("Created Legajo");
      legajosItem = await this.legajoService.postLegajo(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(legajosItem)
    return legajosItem;
  }

  onClickNewChild(data: Legajo) {
    if(data.hijos == null) data.hijos = [{
      ID: null,
      nombre: null,
      apellido: null,
      codigo: null,
      descripcion: null,
      cuil: null,
      obrasocialid: 1
    }];
    
    data.hijos.push({
      ID: null,
      nombre: null,
      apellido: null,
      codigo: null,
      descripcion: null,
      cuil: null,
      obrasocialid: 1
    });
  }

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }

  selectChangeLocalidad(event,data)
  {
    data.localidad = event
    data.localidadid = event.id
  }

  selectChangeProvincia(event,data)
  {
    data.provincia = event
    data.provinciaid = event.id
  }

  selectChangePais(event,data)
  {
    data.pais = event
    data.paisid = event.id
  }

  selectChangeModalidad(event,data)
  {
    data.modalidadcontratacion = event
    data.modalidadcontratacionid = event.id
  }
  
  selectChangeSituacion(event,data)
  {
    data.situacion = event
    data.situacionid = event.id
  }
  
  selectChangeCondicion(event,data)
  {
    data.condicion = event
    data.condicionid = event.id
  }
  
  selectChangeCondicionSiniestrado(event,data)
  {
    data.condicionsiniestrado = event
    data.condicionsiniestradoid = event.id
  }
  
  selectChangeObraSocial(event,data)
  {
    data.obrasocial = event
    data.obrasocialid = event.id
  }
  
  selectChangeConvenio(event,data)
  {
    data.conveniocolectivo = event
    data.conveniocolectivoid = event.id
  }
  
  selectChangeCentroCosto(event,data)
  {
    data.centrodecosto = event
    data.centrodecostoid = event.id
  }

}