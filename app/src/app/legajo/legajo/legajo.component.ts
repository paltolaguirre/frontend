import { ListaItems, LegajoService } from '../legajo.service';
import { Legajo, Hijo } from '../legajo.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddLegajoDialog } from './add-legajo/add-legajo.component';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SelectorDefaultComponent } from 'src/app/shared/selector-default/selector-default.component';

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
    this.paises = [
      { value: 1, viewValue: 'Argentina' },
      { value: 2, viewValue: 'Argelia' },
      { value: 3, viewValue: 'Armenia' },
      { value: 4, viewValue: 'Artico' }
    ];

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
    data.paisid = data.pais.ID;

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

  onClickNewChild(children: Hijo[]) {
    //if(children == null) children = [];
    children.push({
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
}