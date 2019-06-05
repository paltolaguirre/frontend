import { NovedadService } from '../novedad.service';
import { Novedad } from '../novedad.model';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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


  selectChangeLegajo(event,data)
  {
    data.legjao = event
    data.legajoid = event.id
  }

  selectChangeConcepto(event,data)
  {
    data.concepto = event
    data.conceptoid = event.id
  }

}