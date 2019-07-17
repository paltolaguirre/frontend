import { ConceptoService } from '../concepto.service';
import { Concepto } from '../concepto.model';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PrintService } from 'src/app/print/print.service';

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.css']
})
export class ConceptoComponent implements OnInit, AfterViewInit {
  public currentConcepto$: Observable<Concepto> = null;
  paises: any[];
  id: number;
  
  constructor(
    private route: ActivatedRoute,
    private conceptoService: ConceptoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService : PrintService
    ) { }

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
  }

  ngAfterViewInit() {

  }

  private gotoGrilla() {
    this.router.navigate(['/conceptos']);
  }

  onClickAbort(): void {
    this.gotoGrilla();
  }

  async onClickSave(data: Concepto): Promise<Concepto> {
    let conceptosItem: Concepto;

    if(data.cuenta)data.cuentacontable = data.cuenta.ID;

    if (this.id) {
      console.log("Updated Concepto");
      conceptosItem = await this.conceptoService.putConcepto(data);
      this.notificationService.notify("Concepto Actualizado");
    } else {
      console.log("Created Concepto");
      conceptosItem = await this.conceptoService.postConcepto(data);
      this.gotoGrilla();
      this.notificationService.notify("Concepto Creado");
    }

    console.log(data);
    //this.create.emit(conceptosItem)
    return conceptosItem;
  }

  isDefault(data) : Boolean {
    return data.ID<0?true:false;
  }

  selectChange(event,data)
  {
    data.cuenta = event
    data.cuentacontable = event.id
  }

  
}