import { ConceptoService } from '../concepto.service';
import { Concepto } from '../concepto.model';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    private router: Router
    ) { }

  ngOnInit() {
    this.currentConcepto$ = this.route.paramMap.pipe(
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

    // se setea el paisID segun Option del selector de paises    

    if (this.id) {
      console.log("Updated Concepto");
      conceptosItem = await this.conceptoService.putConcepto(data);
    } else {
      console.log("Created Concepto");
      conceptosItem = await this.conceptoService.postConcepto(data);
      this.gotoGrilla();
    }

    console.log(data);
    //this.create.emit(conceptosItem)
    return conceptosItem;
  }

 /* onClickNewChild(children: Hijo[]) {
    //if(children == null) children = [];
  }

  onClickDeleteChild(child: any) {
    child.DeletedAt = new Date();
  }*/
}