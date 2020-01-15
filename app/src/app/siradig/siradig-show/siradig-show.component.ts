import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LiquidacionService } from 'src/app/liquidacion/liquidacion.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/handler-error/notification.service';
import { PrintService } from 'src/app/print/print.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SiradigService } from '../siradig.service';
import { Siradig } from '../siradig.model';

@Component({
  selector: 'app-siradig-show',
  templateUrl: './siradig-show.component.html',
  styleUrls: ['./siradig-show.component.css']
})
export class SiradigShowComponent implements OnInit {
  public currentItem$: Observable<Siradig> = null;
  public print$: Observable<boolean> = null;
  id: number;

  hijossiradig: any[];
  conyugesiradig: any;
  
  constructor(
    private route: ActivatedRoute,
    private siradigService: SiradigService, 
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public printService: PrintService
  ) { }

  ngOnInit() {
    this.currentItem$ = this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        if (params.get('id') == "nuevo") {
          console.log("Nuevo SiRADIG");
        }
        this.id = +params.get('id');
        const siradig = await this.siradigService.getSiradig(this.id);

        console.log(siradig);
        
        return siradig;
      })
    );

    this.print$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const print = (params.get('action') == "imprimir");
        if (print) {
          console.log("Action Imprimir");
        }

        return of(print);
      })
    );
  }

  isNew(data) : Boolean {
    return data.ID==null?false:true;
  }

  getBoolean(event) {
    return event.nombre.toLowerCase() == "si"
  }
}
