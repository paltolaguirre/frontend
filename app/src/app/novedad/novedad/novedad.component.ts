import { ListaItems, NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddNovedadDialog } from './add-novedad/add-novedad.component';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SelectorDefaultComponent } from 'src/app/shared/selector-default/selector-default.component';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit, AfterViewInit {
  public currentNovedad$: Observable<Novedad> = null;
  paises: any[];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private novedadService: NovedadService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.currentNovedad$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo Novedad");
        }
        this.id = +params.get('id');
        const novedad = this.novedadService.getNovedad(this.id);
        console.log(novedad);
        
        return novedad;
      })
    );
  }

  ngAfterViewInit() {

  }

  private gotoGrilla() {
    this.router.navigate(['/novedades']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Novedad): Promise<Novedad> {
    let novedadesItem: Novedad;

    // se setea el paisID segun Option del selector de paises    

    if (this.id) {
      console.log("Updated Novedad");
      novedadesItem = await this.novedadService.putNovedad(data);
    } else {
      console.log("Created Novedad");
      novedadesItem = await this.novedadService.postNovedad(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(novedadesItem)
    return novedadesItem;
  }

 /* onClickNewChild(children: Hijo[]) {
    //if(children == null) children = [];
  }

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }*/
}