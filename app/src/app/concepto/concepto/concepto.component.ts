import { ListaItems, ConceptoService } from '../concepto.service';
import { Concepto } from '../concepto.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AddConceptoDialog } from './add-concepto/add-concepto.component';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SelectorDefaultComponent } from 'src/app/shared/selector-default/selector-default.component';

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

  selectChange(event,data)
  {
    data.cuenta = event
    data.cuentacontable = event.id
  }

  
}